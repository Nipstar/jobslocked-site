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
