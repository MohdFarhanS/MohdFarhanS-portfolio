/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ===========================
   ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ===========================
   TYPED TEXT EFFECT
=========================== */
const phrases = [
  'Full-Stack Developer',
  'Laravel & PHP Developer',
  'Mobile App Developer',
  'Flutter & React Native',
];

let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 50);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 80);
  }
}
type();

/* ===========================
   REVEAL ON SCROLL
=========================== */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    formNote.textContent = 'Message sent! I\'ll get back to you soon.';
    formNote.className = 'form-note success';
    form.reset();
    btn.disabled = false;
    btn.innerHTML = `Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;
    setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 5000);
  }, 1000);
});

/* ===========================
   SMOOTH SCROLL OFFSET
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
