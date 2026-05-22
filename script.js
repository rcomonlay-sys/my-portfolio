/* ===========================
   script.js — Portfolio JS
=========================== */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger menu ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── Animate counter numbers ───────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ── Intersection Observer: reveal on scroll ───────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counters if stat-num
      if (entry.target.classList.contains('stat-num')) {
        animateCounter(entry.target);
      }

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Observe project cards (stagger via CSS transition-delay)
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  card.style.transition = `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms, border-color 0.35s, box-shadow 0.35s`;
  revealObserver.observe(card);
});

// Observe stat counters
document.querySelectorAll('.stat-num').forEach(el => {
  revealObserver.observe(el);
});

// ── Skill tag hover ripple ────────────────────────────────
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(201,168,76,0.08)';
  });
  tag.addEventListener('mouseleave', function() {
    this.style.background = '';
  });
});

// ── Contact form ──────────────────────────────────────────
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-primary');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  // Simulate async send
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Message Sent!';
    success.classList.add('show');

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      success.classList.remove('show');
    }, 3500);
  }, 1200);
});

// ── Active nav link on scroll ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      links.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--white)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── Parallax subtle effect on hero bg text ────────────────
const heroBgText = document.querySelector('.hero-bg-text');

if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
  }, { passive: true });
}

// ── Subtle cursor glow on hero ────────────────────────────
const hero = document.querySelector('.hero');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
  });
}