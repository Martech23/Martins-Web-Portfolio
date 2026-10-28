const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const briefForm = document.querySelector('#brief-form');
const feedback = document.querySelector('#form-feedback');

if (briefForm) {
  briefForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(briefForm);
    const name = String(formData.get('name') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const text = `Olá David, meu nome é ${name}. Vim pelo seu portfólio e tenho interesse em ${service}.\n\n${message}`;
    const whatsappUrl = `https://wa.me/5511975321113?text=${encodeURIComponent(text)}`;
    feedback.textContent = 'Abrindo o WhatsApp com seu briefing...';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
