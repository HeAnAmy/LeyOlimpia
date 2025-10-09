// ===========================
// Tema oscuro / claro
// ===========================
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  // Aplica el tema en <html data-theme="...">
  document.documentElement.setAttribute('data-theme', theme);
  // Estado accesible del botón
  themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
  // Persiste
  localStorage.setItem('theme', theme);
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else {
    // Fallback al esquema del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// ===========================
// Menú móvil
// ===========================
const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Cerrar menú al navegar
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===========================
// FAQ (acordeón)
const accordionButtons = document.querySelectorAll('.accordion .accordion-item');

accordionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // cierra todos
    accordionButtons.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const panel = b.nextElementSibling;
      if (panel) panel.hidden = true;
    });
    // abre el seleccionado si estaba cerrado
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      const panel = btn.nextElementSibling;
      if (panel) panel.hidden = false;
    }
  });
});

// ===========================
// Formulario de contacto (demo)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  setError('err-nombre', '');
  setError('err-email', '');
  setError('err-mensaje', '');
  if (statusEl) statusEl.textContent = '';

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  let ok = true;
  if (!nombre) { setError('err-nombre', 'Escribe tu nombre.'); ok = false; }
  if (!email) { setError('err-email', 'Escribe tu correo.'); ok = false; }
  else if (!validateEmail(email)) { setError('err-email', 'Correo inválido.'); ok = false; }
  if (!mensaje) { setError('err-mensaje', 'Cuéntanos en qué podemos apoyar.'); ok = false; }

  if (!ok) return;

  // Simulación de envío (aquí integrarías tu backend / servicio real)
  setTimeout(() => {
    if (statusEl) statusEl.textContent = 'Gracias. Te responderemos en breve.';
    form.reset();
  }, 500);
});

// ===========================
// Fecha de actualización
const lastUpdated = document.getElementById('lastUpdated');
if (lastUpdated) {
  const now = new Date();
  lastUpdated.textContent = now.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}