const nav = document.querySelector('.nav');
const mobile = document.querySelector('#mobileNav');
const menuBtn = document.querySelector('#menuBtn');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuBtn.addEventListener('click', () => {
  const open = mobile.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#mobileNav a, .nav-links a').forEach((link) => {
  link.addEventListener('click', () => mobile.classList.remove('open'));
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
