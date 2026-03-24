// === Theme Toggle ===
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = 'dark';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// === Header scroll behavior ===
(function () {
  const header = document.getElementById('header');
  let lastScroll = 0;
  const threshold = 60;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > threshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 300) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });
})();

// === Mobile menu ===
(function () {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// === Intersection Observer for fade-in animations ===
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// === Number counter animation ===
(function () {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          animateCount(el, 0, target, 1200);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current + '+';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
})();

// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
