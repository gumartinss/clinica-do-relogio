// Clínica do Relógio — interações do site

const WHATSAPP_NUMBER = '5547992125757';
const THEME_KEY = 'clinica-do-relogio-theme';

function currentTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
  const link = document.getElementById('themeStylesheet');
  if (link) link.setAttribute('href', theme === 'light' ? 'css/style-light.css' : 'css/style.css');
  document.documentElement.setAttribute('data-theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  applyTheme(currentTheme());
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = currentTheme() === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (navClose && mobileNav) {
    navClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  const watchForm = document.getElementById('watchForm');
  if (watchForm) {
    watchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = watchForm.nome.value.trim();
      const telefone = watchForm.telefone.value.trim();
      const marca = watchForm.marca.value.trim();
      const modelo = watchForm.modelo.value.trim();
      const entrega = watchForm.entrega.value;
      const problema = watchForm.problema.value.trim();

      const lines = [
        'Olá! Gostaria de um orçamento para o meu relógio.',
        '',
        `Nome: ${nome}`,
        `Telefone: ${telefone}`,
        `Marca: ${marca}`,
        modelo ? `Modelo: ${modelo}` : null,
        `Forma de entrega: ${entrega}`,
        `Descrição: ${problema}`,
      ].filter(Boolean);

      const message = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank', 'noopener');
    });
  }
});
