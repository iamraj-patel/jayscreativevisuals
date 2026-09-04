/* ==========================================================================
   Jay's Creative Visuals — Main JavaScript
   All DOM lookups and variable declarations happen BEFORE any function that
   references them is invoked, to avoid temporal-dead-zone errors.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Element references (declare everything up front) ---------------- */
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('backToTop');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.getElementById('testimonialDots');
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const yearEl = document.getElementById('year');

  /* ---------------- Footer year ---------------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Back to top visibility (function defined before use) ---------------- */
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }

  /* ---------------- Sticky header + back-to-top on scroll ---------------- */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
    toggleBackToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // safe: toggleBackToTop and backToTop are already defined above

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- Active nav link on scroll (IntersectionObserver) ---------------- */
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(sec => navObserver.observe(sec));
  }

  /* ---------------- Reveal-on-scroll animations ---------------- */
  const revealEls = document.querySelectorAll('.reveal:not(.is-visible)');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- Portfolio filtering ---------------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
        // Pause any playing video hidden by the filter
        if (!match) {
          const vid = item.querySelector('video');
          if (vid && !vid.paused) vid.pause();
        }
      });
    });
  });

  /* ---------------- Portfolio video tiles: play preview on hover/focus ---------------- */
  portfolioItems.forEach(item => {
    const vid = item.querySelector('video');
    if (!vid) return;
    const play = () => { vid.play().catch(() => {}); };
    const pause = () => { vid.pause(); vid.currentTime = 0; };
    item.addEventListener('mouseenter', play);
    item.addEventListener('mouseleave', pause);
    item.addEventListener('focus', play);
    item.addEventListener('blur', pause);
  });

  /* ---------------- Lightbox gallery (supports images AND videos) ---------------- */
  const galleryItems = Array.from(portfolioItems); // all tiles are viewable in the lightbox
  let currentIndex = 0;

  function stopAnyLightboxVideo() {
    const v = lightboxContent.querySelector('video');
    if (v) v.pause();
  }

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const title = item.querySelector('.portfolio-overlay h4')?.textContent || '';
    const category = item.querySelector('.portfolio-overlay .cat')?.textContent || '';

    // Clear previous media (image or video) but keep the caption element outside this
    const oldMedia = lightboxContent.querySelector('img, video');
    if (oldMedia) oldMedia.remove();

    if (item.dataset.type === 'video') {
      const srcVideo = item.querySelector('video');
      const video = document.createElement('video');
      video.src = srcVideo.getAttribute('src');
      video.setAttribute('controls', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      video.muted = false;
      lightboxContent.insertBefore(video, lightboxCaption);
    } else {
      const srcImg = item.querySelector('img');
      const img = document.createElement('img');
      img.src = srcImg.getAttribute('src');
      img.alt = srcImg.getAttribute('alt') || '';
      lightboxContent.insertBefore(img, lightboxCaption);
    }

    lightboxCaption.textContent = category ? `${category} — ${title}` : title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    stopAnyLightboxVideo();
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showRelative(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showRelative(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showRelative(1));
  if (lightbox) {
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ---------------- Testimonials slider ---------------- */
  if (slides.length && dotsWrap) {
    let activeSlide = 0;
    let slideTimer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function goToSlide(index) {
      slides[activeSlide].classList.remove('active');
      dots[activeSlide].classList.remove('active');
      activeSlide = index;
      slides[activeSlide].classList.add('active');
      dots[activeSlide].classList.add('active');
      resetTimer();
    }

    function nextSlide() { goToSlide((activeSlide + 1) % slides.length); }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, 6000);
    }
    resetTimer();
  }

  /* ---------------- Contact Form: field references ---------------- */
  const fromNameInput = document.getElementById('fromName');
  const fromEmailInput = document.getElementById('fromEmail');
  const phoneInput = document.getElementById('phone');
  const sessionTypeInput = document.getElementById('sessionType');
  const messageInput = document.getElementById('message');

  const fromNameError = document.getElementById('fromNameError');
  const fromEmailError = document.getElementById('fromEmailError');
  const phoneError = document.getElementById('phoneError');
  const sessionTypeError = document.getElementById('sessionTypeError');
  const messageError = document.getElementById('messageError');

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  // Matches the exact displayed format: (555) 123-4567
  const PHONE_DISPLAY_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

  function setFieldError(inputEl, errorEl, message) {
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
    if (inputEl) inputEl.classList.add('is-invalid');
  }

  function clearFieldError(inputEl, errorEl) {
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
    if (inputEl) inputEl.classList.remove('is-invalid');
  }

  /**
   * Formats a raw string of digits into the (xxx) xxx-xxxx pattern,
   * building up progressively as the user types.
   */
  function formatPhoneDigits(digits) {
    const d = digits.slice(0, 10);
    const len = d.length;
    if (len === 0) return '';
    if (len < 4) return '(' + d;
    if (len < 7) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
    return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6, 10);
  }

  /* ---------------- Phone field: auto-format as (xxx) xxx-xxxx, digits only ---------------- */
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const digitsOnly = phoneInput.value.replace(/[^0-9]/g, '').slice(0, 10);
      const formatted = formatPhoneDigits(digitsOnly);
      if (phoneInput.value !== formatted) phoneInput.value = formatted;
      // Live-clear the error as soon as the field is emptied or becomes a complete, valid number
      if (formatted.length === 0 || PHONE_DISPLAY_REGEX.test(formatted)) {
        clearFieldError(phoneInput, phoneError);
      }
    });
  }

  /* ---------------- Live validation as user types/leaves each field ---------------- */
  if (fromNameInput) {
    fromNameInput.addEventListener('blur', () => {
      if (fromNameInput.value.trim().length === 0) {
        setFieldError(fromNameInput, fromNameError, 'Please enter your full name.');
      } else {
        clearFieldError(fromNameInput, fromNameError);
      }
    });
  }

  if (fromEmailInput) {
    fromEmailInput.addEventListener('input', () => {
      if (fromEmailInput.value.trim().length === 0 || EMAIL_REGEX.test(fromEmailInput.value.trim())) {
        clearFieldError(fromEmailInput, fromEmailError);
      }
    });
    fromEmailInput.addEventListener('blur', () => {
      const val = fromEmailInput.value.trim();
      if (val.length === 0) {
        setFieldError(fromEmailInput, fromEmailError, 'Email address is required.');
      } else if (!EMAIL_REGEX.test(val)) {
        setFieldError(fromEmailInput, fromEmailError, 'Please enter a valid email address (e.g. name@example.com).');
      } else {
        clearFieldError(fromEmailInput, fromEmailError);
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      const val = phoneInput.value.trim();
      if (val.length > 0 && !PHONE_DISPLAY_REGEX.test(val)) {
        setFieldError(phoneInput, phoneError, 'Please enter a complete phone number in the format (555) 123-4567.');
      } else {
        clearFieldError(phoneInput, phoneError);
      }
    });
  }

  if (sessionTypeInput) {
    sessionTypeInput.addEventListener('change', () => {
      if (sessionTypeInput.value) clearFieldError(sessionTypeInput, sessionTypeError);
    });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      if (messageInput.value.trim().length === 0) {
        setFieldError(messageInput, messageError, 'Please tell us a bit about your event.');
      } else {
        clearFieldError(messageInput, messageError);
      }
    });
  }

  /**
   * Runs full validation across all fields. Returns true if the form is valid.
   * Focuses + scrolls to the first invalid field found.
   */
  function validateContactForm() {
    let isValid = true;
    let firstInvalidEl = null;

    const nameVal = fromNameInput ? fromNameInput.value.trim() : '';
    if (nameVal.length === 0) {
      setFieldError(fromNameInput, fromNameError, 'Please enter your full name.');
      isValid = false;
      firstInvalidEl = firstInvalidEl || fromNameInput;
    } else {
      clearFieldError(fromNameInput, fromNameError);
    }

    const emailVal = fromEmailInput ? fromEmailInput.value.trim() : '';
    if (emailVal.length === 0) {
      setFieldError(fromEmailInput, fromEmailError, 'Email address is required.');
      isValid = false;
      firstInvalidEl = firstInvalidEl || fromEmailInput;
    } else if (!EMAIL_REGEX.test(emailVal)) {
      setFieldError(fromEmailInput, fromEmailError, 'Please enter a valid email address (e.g. name@example.com).');
      isValid = false;
      firstInvalidEl = firstInvalidEl || fromEmailInput;
    } else {
      clearFieldError(fromEmailInput, fromEmailError);
    }

    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    if (phoneVal.length > 0 && !PHONE_DISPLAY_REGEX.test(phoneVal)) {
      setFieldError(phoneInput, phoneError, 'Please enter a complete phone number in the format (555) 123-4567.');
      isValid = false;
      firstInvalidEl = firstInvalidEl || phoneInput;
    } else {
      clearFieldError(phoneInput, phoneError);
    }

    const sessionVal = sessionTypeInput ? sessionTypeInput.value : '';
    if (!sessionVal) {
      setFieldError(sessionTypeInput, sessionTypeError, 'Please select a session type.');
      isValid = false;
      firstInvalidEl = firstInvalidEl || sessionTypeInput;
    } else {
      clearFieldError(sessionTypeInput, sessionTypeError);
    }

    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (messageVal.length === 0) {
      setFieldError(messageInput, messageError, 'Please tell us a bit about your event.');
      isValid = false;
      firstInvalidEl = firstInvalidEl || messageInput;
    } else {
      clearFieldError(messageInput, messageError);
    }

    if (!isValid && firstInvalidEl) {
      firstInvalidEl.focus({ preventScroll: true });
      firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
  }

  /* ---------------- EmailJS Contact Form submission ---------------- */
  const emailjsReady = (typeof window.emailjs !== 'undefined') && (typeof EMAILJS_CONFIG !== 'undefined');

  if (emailjsReady) {
    try {
      window.emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    } catch (err) {
      console.error('EmailJS init failed:', err);
    }
  } else {
    console.warn('EmailJS SDK or config not available — contact form will show a friendly error on submit.');
  }

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateContactForm()) {
        showStatus('Please fix the highlighted fields above before submitting.', 'error');
        return;
      }

      const keysConfigured = emailjsReady &&
        EMAILJS_CONFIG.PUBLIC_KEY && !EMAILJS_CONFIG.PUBLIC_KEY.includes('YOUR_') &&
        EMAILJS_CONFIG.SERVICE_ID && !EMAILJS_CONFIG.SERVICE_ID.includes('YOUR_') &&
        EMAILJS_CONFIG.TEMPLATE_ID && !EMAILJS_CONFIG.TEMPLATE_ID.includes('YOUR_');

      if (!keysConfigured) {
        showStatus('Contact form is not fully configured yet. Please add your EmailJS keys in js/config.js (see README.md).', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
      }

      window.emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, contactForm)
        .then(() => {
          showStatus("Thank you! Your message has been sent — I'll get back to you within 24 hours.", 'success');
          contactForm.reset();
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          showStatus('Something went wrong sending your message. Please try again or email us directly.', 'error');
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.classList.remove('is-loading');
            submitBtn.disabled = false;
          }
        });
    });
  }

});
