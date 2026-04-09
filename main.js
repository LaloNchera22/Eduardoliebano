// ═══════════════════════════════════════════════
//   EDUARDO LIEBANO — AI ENGINEER PORTFOLIO
//   Interactions & Animations
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .xp-item, .contact-item, .stat'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.borderBottomColor = 'transparent';
          link.style.color = '';
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.borderBottomColor = '#4285F4';
          activeLink.style.color = '#4285F4';
        }
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ── Nav background on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = '#0A0A0A';
      nav.style.boxShadow = '0 2px 0 #0A0A0A';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── Skill bars animate on visible ──
  const skillBars = document.querySelectorAll('.skill-fill');
  const barWidths = [];
  skillBars.forEach(bar => {
    barWidths.push(bar.style.width);
    bar.style.width = '0%';
  });

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar, i) => {
          setTimeout(() => { bar.style.width = barWidths[i]; }, i * 80);
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
      }, 18);
    }, 600 + i * 120);
  });

  // ── Cursor glow effect ──
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(66,133,244,0.05) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });

});
