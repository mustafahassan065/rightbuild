

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ===== Sticky Navbar Shadow =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.style.boxShadow = '0 6px 25px rgba(14,26,43,.12)';
  else navbar.style.boxShadow = '0 2px 20px rgba(14,26,43,.06)';
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const runCounter = (el) => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { runCounter(e.target); counterObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Back To Top =====
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? 'block' : 'none';
      if (match) {
        card.style.animation = 'fadeIn .5s ease';
      }
    });
  });
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== Testimonial Slider (auto) =====
const track = document.querySelector('.testi-track');
if (track) {
  let idx = 0;
  const cards = track.children.length;
  setInterval(() => {
    idx = (idx + 1) % cards;
    track.style.transform = `translateX(-${idx * 100}%)`;
  }, 4500);
}
