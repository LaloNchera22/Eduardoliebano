// ═══════════════════════════════════════════════
//   EDUARDO LIEBANO — AI ENGINEER PORTFOLIO
//   Interactions & Animations
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  function toggleMenu(forceClose) {
    const isOpen = hamburger.classList.contains('open');
    const shouldOpen = forceClose ? false : !isOpen;
    hamburger.classList.toggle('open', shouldOpen);
    hamburger.setAttribute('aria-expanded', shouldOpen);
    navMobile.classList.toggle('open', shouldOpen);
    navMobile.setAttribute('aria-hidden', !shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(true)));

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
      if (hamburger.classList.contains('open')) toggleMenu(true);
    }
  });

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .xp-item, .contact-item, .stat'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ── Nav shadow on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.08)' : 'none';
  }, { passive: true });

  // ── Skill bars animate on visible ──
  const skillBars = document.querySelectorAll('.skill-fill');
  const barWidths = Array.from(skillBars).map(bar => {
    const w = bar.style.width;
    bar.style.width = '0%';
    return w;
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar, i) => {
          setTimeout(() => { bar.style.width = barWidths[i]; }, i * 90);
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) barObserver.observe(skillsSection);

  // ── Terminal typing effect ──
  const terminalLines = document.querySelectorAll('.t-output');
  terminalLines.forEach((line, i) => {
    const text = line.textContent;
    line.textContent = '';
    setTimeout(() => {
      let j = 0;
      const interval = setInterval(() => {
        line.textContent += text[j];
        j++;
        if (j >= text.length) clearInterval(interval);
      }, 16);
    }, 500 + i * 110);
  });

  // ── Cursor glow effect (desktop only) ──
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(66,133,244,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: left 0.18s ease, top 0.18s ease;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
