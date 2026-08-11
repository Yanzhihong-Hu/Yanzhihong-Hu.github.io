(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var navigation = document.querySelector('.site-nav');

  function closeNavigation() {
    if (!toggle || !navigation) return;
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (toggle && navigation) {
    toggle.addEventListener('click', function () {
      var willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(willOpen));
      navigation.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('nav-open', willOpen);
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNavigation();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) closeNavigation();
    });
  }

  var revealItems = document.querySelectorAll('.reveal');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reducedMotion) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) { observer.observe(item); });
  }

  var galleryDialog = document.querySelector('[data-gallery-dialog]');
  var galleryOpeners = document.querySelectorAll('[data-gallery-open]');
  var galleryClose = galleryDialog && galleryDialog.querySelector('[data-gallery-close]');
  var galleryImage = galleryDialog && galleryDialog.querySelector('[data-gallery-dialog-image]');
  var galleryCategory = galleryDialog && galleryDialog.querySelector('[data-gallery-dialog-category]');
  var galleryCaption = galleryDialog && galleryDialog.querySelector('[data-gallery-dialog-caption]');
  var lastGalleryTrigger = null;

  function closeGallery() {
    if (galleryDialog && galleryDialog.open) galleryDialog.close();
  }

  if (galleryDialog && galleryOpeners.length) {
    galleryOpeners.forEach(function (opener) {
      opener.addEventListener('click', function () {
        if (typeof galleryDialog.showModal !== 'function') {
          window.location.href = opener.getAttribute('data-gallery-src');
          return;
        }

        lastGalleryTrigger = opener;
        galleryImage.src = opener.getAttribute('data-gallery-src');
        galleryImage.alt = opener.getAttribute('data-gallery-alt') || '';
        galleryCategory.textContent = opener.getAttribute('data-gallery-category') || '';
        galleryCaption.textContent = opener.getAttribute('data-gallery-caption') || '';
        galleryDialog.showModal();
        document.body.classList.add('dialog-open');
        galleryClose.focus();
      });
    });

    galleryClose.addEventListener('click', closeGallery);

    galleryDialog.addEventListener('click', function (event) {
      if (event.target === galleryDialog) closeGallery();
    });

    galleryDialog.addEventListener('close', function () {
      document.body.classList.remove('dialog-open');
      galleryImage.removeAttribute('src');
      if (lastGalleryTrigger) lastGalleryTrigger.focus();
    });
  }

  var printPage = document.querySelector('[data-print-page]');
  if (printPage) {
    printPage.addEventListener('click', function () { window.print(); });
  }
}());
