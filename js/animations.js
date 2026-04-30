/* =============================================
   BRICKSY ENTERPRISE — Scroll Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounters();
  initParallax();
});

/* ---- IntersectionObserver scroll animations ---- */
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll(
    '.animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-scale, .animate-fade, .stagger-children'
  );
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));
}

/* ---- Counter animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(update);
}

/* ---- Parallax effect ---- */
function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) * speed;
      el.style.transform = `translateY(${scrollY * speed - offset}px)`;
    });
  }, { passive: true });
}

/* ---- Progress bars ---- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
