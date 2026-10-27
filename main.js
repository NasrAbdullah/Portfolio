/* ============================================
   NASCODE — Main Script
   ============================================ */
'use strict';

/* ---------- Navbar ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateScrollProgress();
  updateBackToTop();
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Scroll Progress ---------- */
const progressBar = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = percent + '%';
}

/* ---------- Back to Top ---------- */
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Active Nav Link ---------- */
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinkItems.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ---------- Reveal on Scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Project Modal ---------- */
const projectsData = {
  accounting: {
    title: 'Accounting System',
    type: 'DESKTOP APPLICATION',
    desc: 'A complete business management and accounting system designed for real operational workflows. Includes invoicing, transaction tracking, reporting, and full data control. Built with a focus on reliability, clean architecture, and long-term maintainability.',
    tech: ['C#', 'WinForms', 'SQL Server']
  },
  nasbank: {
    title: 'NASBANK',
    type: 'WEB SYSTEM',
    desc: 'A banking-style web platform with account management, transaction history, secure user flows, and an administration layer. Designed as a realistic simulation of financial software with attention to data integrity and UI clarity.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript']
  },
  portfolio: {
    title: 'NASCODE Portfolio',
    type: 'PERSONAL BRAND',
    desc: 'A personal developer portfolio designed and coded from scratch — reflecting a technical identity through layout, typography, and interaction. Built with performance and clean structure in mind.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React']
  }
};

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

function openModal(key) {
  const data = projectsData[key];
  if (!data) return;
  modalBody.innerHTML = `
    <h3>${data.title}</h3>
    <span class="modal-type">${data.type}</span>
    <p>${data.desc}</p>
    <div class="project-tech">
      ${data.tech.map(t => `<span>${t}</span>`).join('')}
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(btn.dataset.open);
  });
});

modal.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---------- Contact Form ---------- */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '✓ Message Sent';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 2600);
});

/* ---------- Smooth Anchor Offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/* ---------- Init ---------- */
updateScrollProgress();
updateBackToTop();
console.log('%c< NASCODE /> ' + '%cSoftware Engineer Portfolio loaded.',
  'color:#60A5FA;font-weight:bold;font-family:monospace;',
  'color:#A8B4C7;font-family:monospace;');
