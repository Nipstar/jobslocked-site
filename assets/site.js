/* JobsLocked — booking modal + analytics. No dependencies. */
(function () {
  'use strict';

  function track(event, props) {
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: event }, props || {}));
  }

  // page-view events
  var planSlug = (location.pathname.match(/^\/plans\/([^/]+)/) || [])[1];
  if (planSlug) track('plan_view', { plan: planSlug });
  if (/^\/book\/?$/.test(location.pathname)) track('booking_page_view');

  // call_click
  document.addEventListener('click', function (e) {
    var t = e.target.closest('a[href^="tel:"]');
    if (t) track('call_click', { number: t.getAttribute('href').slice(4) });
  });

  // faq_open
  document.querySelectorAll('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) track('faq_open', { question: d.querySelector('summary').textContent.trim() });
    });
  });

  // chat widget — deferred to first interaction (or 3.5s) to keep it off the mobile critical path
  var CHAT_WIDGET_ID = '6a95a728875dbbff936e1cf6';
  var chatLoaded = false;
  function loadChatWidget() {
    if (chatLoaded) return;
    chatLoaded = true;
    ['scroll', 'pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { removeEventListener(ev, loadChatWidget); });
    var s = document.createElement('script');
    s.src = 'https://widgets.leadconnectorhq.com/loader.js';
    s.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    s.setAttribute('data-widget-id', CHAT_WIDGET_ID);
    document.body.appendChild(s);
  }
  ['scroll', 'pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { addEventListener(ev, loadChatWidget, { passive: true }); });
  setTimeout(loadChatWidget, 3500);

  // booking modal — lazy CRM embed, loaded on first open only
  var EMBED_SRC = 'https://crm.antekautomation.com/widget/booking/F0NVJAUm537h7ZbOERjf';
  var EMBED_ID = 'F0NVJAUm537h7ZbOERjf_1788173445410';
  var SCRIPT_SRC = 'https://crm.antekautomation.com/js/form_embed.js';
  var dialog = null, lastTrigger = null;

  function buildDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'book-modal';
    dialog.setAttribute('aria-label', 'Book a 15-minute call');
    dialog.innerHTML =
      '<div class="head"><button type="button" class="close" aria-label="Close">×</button></div>' +
      '<div class="body"></div>';
    var iframe = document.createElement('iframe');
    iframe.src = EMBED_SRC;
    iframe.id = EMBED_ID;
    iframe.setAttribute('allow', 'payment');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.cssText = 'width:100%;border:none;overflow:hidden;';
    iframe.title = 'Booking calendar';
    dialog.querySelector('.body').appendChild(iframe);
    document.body.appendChild(dialog);
    if (!document.querySelector('script[src="' + SCRIPT_SRC + '"]')) {
      var s = document.createElement('script');
      s.src = SCRIPT_SRC;
      document.body.appendChild(s);
    }
    dialog.querySelector('.close').addEventListener('click', function () { dialog.close(); });
    // backdrop click: <dialog> itself is the click target only outside the panel content
    dialog.addEventListener('click', function (e) {
      var r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
    dialog.addEventListener('close', function () {
      document.body.classList.remove('modal-open');
      if (lastTrigger) lastTrigger.focus();
    });
  }

  function openModal(trigger) {
    lastTrigger = trigger;
    if (!dialog) buildDialog();
    dialog.showModal(); // native dialog traps focus and handles Esc
    document.body.classList.add('modal-open');
    track('booking_open');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-book]');
    if (!el || !window.HTMLDialogElement) return; // no dialog support -> follow href to /book/
    e.preventDefault();
    openModal(el);
  });
})();

// ---- missed-call cost calculator (one per page; price + plan name come from the section) ----
(function () {
  'use strict';
  var sec = document.querySelector('.calc');
  if (!sec) return;
  var price = +sec.dataset.price, plan = sec.dataset.plan;
  var miss = sec.querySelector('#c-miss'), job = sec.querySelector('#c-job'), win = sec.querySelector('#c-win');
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var tracked = false;
  function calc() {
    var m = +miss.value, j = +job.value, w = +win.value / 100;
    var perMonth = m * 4.33, jobs = perMonth * w, lost = jobs * j, n = Math.round(jobs);
    sec.querySelector('[for=c-miss] output').textContent = m;
    sec.querySelector('[for=c-job] output').textContent = fmt(j);
    sec.querySelector('[for=c-win] output').textContent = Math.round(w * 100) + '%';
    sec.querySelector('.v-calls').textContent = Math.round(perMonth);
    sec.querySelector('.v-jobs').textContent = n;
    sec.querySelector('.v-lost').textContent = fmt(lost) + '/mo';
    var v = sec.querySelector('.verdict');
    if (lost <= price) {
      v.textContent = plan + ' is ' + fmt(price) + ' a month. At these numbers it’s marginal — but one decent install or repair a month changes the picture entirely.';
    } else {
      v.innerHTML = plan + ' is ' + fmt(price) + ' a month. At your numbers, <strong>it pays for itself with the first job it saves</strong>' +
        (n > 1 ? ', and the other ' + (n - 1) + (n - 1 === 1 ? ' is' : ' are') + ' profit.' : '.');
    }
  }
  [miss, job, win].forEach(function (r) {
    r.addEventListener('input', function () {
      calc();
      if (!tracked && window.dataLayer) { tracked = true; window.dataLayer.push({ event: 'calc_change' }); }
    });
  });
  calc();
})();

// ---- phone demo: transcript is static HTML; reveal it in sequence, keep 7 visible, loop ----
(function () {
  'use strict';
  var demo = document.querySelector('.demo');
  if (!demo || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var nodes = [].slice.call(demo.querySelectorAll('.chat > *'));
  function play() {
    var i = 0;
    nodes.forEach(function (n) { n.classList.remove('on'); n.hidden = false; });
    function next() {
      nodes[i].classList.add('on');
      if (i >= 7) nodes[i - 7].hidden = true;
      i++;
      setTimeout(i < nodes.length ? next : play, i < nodes.length ? 1400 : 6000);
    }
    setTimeout(next, 400);
  }
  // watch the phone, not the section: on mobile the section is several screens tall
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    demo.classList.add('play');
    play();
  }, { threshold: 0.4 });
  io.observe(demo.querySelector('.phone'));
})();
