/* =============================================
   BRICKSY ENTERPRISE — Main JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initActivePage();
  initHeroLoad();
});

/* ---- Navbar scroll effect ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile hamburger menu ---- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---- Smooth scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---- Back to top button ---- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Active page highlighting ---- */
function initActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- Hero load animation ---- */
function initHeroLoad() {
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }
}

/* ---- Accordion ---- */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      // Close all
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ---- Filter Tabs ---- */
function initFilterTabs() {
  document.querySelectorAll('.filter-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        const container = document.querySelector(tabGroup.dataset.target);
        if (!container) return;
        container.querySelectorAll('[data-category]').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.5s var(--ease-out) forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}

/* ---- Newsletter form ---- */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value) {
    showToast('Thank you for subscribing!', 'success');
    input.value = '';
  }
}

/* ---- Toast notification ---- */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toast.style.cssText = `
    position:fixed; bottom:30px; left:50%; transform:translateX(-50%) translateY(20px);
    background:${type === 'success' ? '#2D8C4E' : '#D63B3B'}; color:#fff;
    padding:14px 28px; border-radius:8px; font-family:var(--font-accent);
    font-size:0.9rem; box-shadow:0 8px 30px rgba(0,0,0,0.2);
    z-index:9999; opacity:0; transition:all 0.4s ease;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
