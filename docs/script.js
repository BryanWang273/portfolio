// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Nav background on scroll
// ============================================
const siteNav = document.getElementById('siteNav');
if (siteNav) {
  const onScroll = () => {
    siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// Scroll progress bar
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const onProgressScroll = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${pct}%`;
};
onProgressScroll();
window.addEventListener('scroll', onProgressScroll, { passive: true });
window.addEventListener('resize', onProgressScroll);

// ============================================
// Scroll reveal
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
    io.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ============================================
// Hero role cycling text (home page only)
// ============================================
const roleText = document.getElementById('roleText');

if (roleText) {
  const roles = [
    'Backend & Full-Stack Systems',
    'AI-Powered Applications',
    'Reliable, Well-Tested APIs',
  ];

  async function typeText(text, speed = 32) {
    roleText.textContent = '';
    for (const char of text) {
      roleText.textContent += char;
      await new Promise(r => setTimeout(r, speed));
    }
  }

  async function eraseText(speed = 18) {
    while (roleText.textContent.length > 0) {
      roleText.textContent = roleText.textContent.slice(0, -1);
      await new Promise(r => setTimeout(r, speed));
    }
  }

  async function cycleRoles() {
    if (reduceMotion) { roleText.textContent = roles[0]; return; }
    let i = 0;
    while (true) {
      await typeText(roles[i]);
      await new Promise(r => setTimeout(r, 1800));
      await eraseText();
      await new Promise(r => setTimeout(r, 300));
      i = (i + 1) % roles.length;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    roleText.textContent = '';
    cycleRoles();
  });
}
