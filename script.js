  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active-link', a.dataset.page === id));
    setTimeout(initReveal, 100);
  }

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (navbar.classList.contains('open')) {
          navbar.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open menu');
        }
      });
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.page.active .reveal, .page.active .reveal-left, .page.active .reveal-right');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
      else obs.observe(el);
    });
  }

  function filterProducts(cat, e) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('#products-grid .product-card').forEach(c => {
      const show = cat === 'all' || c.dataset.category === cat;
      c.style.display = show ? 'block' : 'none';
      if (show) { c.classList.remove('visible'); setTimeout(() => c.classList.add('visible'), 60); }
    });
  }

  function handleForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const msg = document.getElementById('message').value;
    window.open(`https://wa.me/27677520827?text=Hi%20M.Sskins!%20My%20name%20is%20${encodeURIComponent(name)}.%20${encodeURIComponent(msg)}`, '_blank');
  }

  window.addEventListener('load', initReveal);