/* =========================================================================
   YOUTH PANEL COMMUNAL AGOÈ-NYIVÉ 4 — script.js
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Barre de progression de scroll ---- */
  const progress = document.querySelector('.scroll-progress');
  const setProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + '%';
  };

  /* ---- Header au scroll ---- */
  const header = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-top');
  const onScroll = () => {
    if (window.scrollY > 40) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');

    if (backTop) {
      if (window.scrollY > 600) backTop.classList.add('show');
      else backTop.classList.remove('show');
    }
    setProgress();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Menu mobile ---- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');

  const openMenu = () => {
    burger?.classList.add('open');
    mobileNav?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    burger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  };
  burger?.addEventListener('click', () => {
    mobileNav?.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---- Reveal au scroll (IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Compteurs animés (statistiques) ---- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target % 1 === 0 ? Math.floor(target * eased) : (target * eased).toFixed(1);
      el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const ioCount = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => ioCount.observe(el));
  }

  /* ---- Marquage du lien de navigation actif ---- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Filtres (page réalisations) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-cat]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      filterItems.forEach(item => {
        const show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });

});
