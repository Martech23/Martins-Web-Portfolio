const nav = document.querySelector('.nav');
const mobile = document.querySelector('#mobileNav');
const menuBtn = document.querySelector('#menuBtn');

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function goToSection(id) {
  if (!id || id === 'home') {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const offset = nav ? nav.offsetHeight + 8 : 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion() ? 'auto' : 'smooth' });
}

function clearHash() {
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuBtn.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (!href.startsWith('#') || href.length < 2) return;
  e.preventDefault();
  goToSection(href.slice(1));
  mobile.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  history.replaceState(null, '', location.pathname + location.search);
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach((s) => io.observe(s));
}

if (location.hash) {
  const id = location.hash.slice(1);
  history.replaceState(null, '', location.pathname + location.search);
  requestAnimationFrame(() => goToSection(id));
}

const leadForm = document.querySelector('#leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const text = [
      'Olá David, quero um orçamento.',
      `Nome: ${data.get('nome')}`,
      `WhatsApp: ${data.get('whatsapp')}`,
      `Serviço: ${data.get('servico')}`,
      `Orçamento: ${data.get('orcamento')}`,
      `Projeto: ${data.get('mensagem')}`
    ].join('\n');
    window.open(`https://wa.me/5511975321113?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}
