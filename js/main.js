/* =============================================
   SUSMI NAILS AND BEAUTY STUDIO — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- MOBILE DRAWER ---- */
  const toggle  = document.getElementById('navToggle');
  const drawer  = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  const close   = document.getElementById('drawerClose');

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    toggle?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    toggle?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', openDrawer);
  close?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  /* close drawer on nav link click */
  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- FADE-IN ON SCROLL ---- */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-left, .fade-right');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    fadeEls.forEach(el => io.observe(el));
  }

  /* ---- GALLERY FILTER (gallery page) ---- */
  const filterBtns = document.querySelectorAll('.gf-btn');
  const galleryItems = document.querySelectorAll('.g-full-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.opacity    = show ? '1' : '0';
        item.style.transform  = show ? 'scale(1)' : 'scale(0.95)';
        item.style.pointerEvents = show ? 'auto' : 'none';
        item.style.position   = show ? 'relative' : 'absolute';
      });
    });
  });

  /* ---- SMOOTH COUNTER ANIMATION ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (!target) return;
    const dur  = 1600;
    const step = 16;
    const inc  = target / (dur / step);
    let cur = 0;
    const suffix = el.dataset.suffix || '';
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur) + suffix;
    }, step);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---- CONTACT FORM → WHATSAPP REDIRECT ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = (form.querySelector('#name')?.value    || '').trim();
      const phone   = (form.querySelector('#phone')?.value   || '').trim();
      const service = (form.querySelector('#service')?.value || '').trim();
      const message = (form.querySelector('#message')?.value || '').trim();

      let waText = `Hi! I'm ${name || 'a new client'} and I'd like to enquire.`;
      if (service) waText += `\n\nService: ${service}`;
      if (phone)   waText += `\nPhone: ${phone}`;
      if (message) waText += `\n\nMessage:\n${message}`;
      waText += '\n\nLooking forward to hearing from you!';

      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Opening WhatsApp…';
      btn.disabled = true;

      setTimeout(() => {
        window.open('https://wa.me/9779810277266?text=' + encodeURIComponent(waText), '_blank');
        btn.innerHTML = orig;
        btn.disabled = false;
        form.reset();
      }, 600);
    });
  }

});
