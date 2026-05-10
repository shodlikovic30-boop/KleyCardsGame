// Простейшая логика: поиск, открытие видео-модала, тема, избранное (localStorage), мобильное меню
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const searchClear = document.getElementById('searchClear');
  const cards = Array.from(document.querySelectorAll('.card'));
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const playBtns = document.querySelectorAll('.card .play');
  const favBtns = document.querySelectorAll('.card .fav');
  const themeToggle = document.getElementById('themeToggle');
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav');

  // Восстановить тему
  const savedTheme = localStorage.getItem('kley_theme');
  if (savedTheme === 'light') document.body.classList.remove('theme-dark');

  // Поиск по названию (фильтрация)
  search?.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      card.style.display = title.includes(q) ? '' : 'none';
    });
  });
  searchClear?.addEventListener('click', () => { search.value = ''; search.dispatchEvent(new Event('input')); });

  // Открыть видео-модал
  playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const src = btn.dataset.video;
      // поддержка youtube/embed или прямых ссылок
      videoFrame.src = src;
      videoModal.setAttribute('aria-hidden', 'false');
    });
  });

  // Закрыть модалы
  function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.setAttribute('aria-hidden','true'));
    videoFrame.src = '';
  }
  document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModals));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModals(); });
  videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeModals(); });
  loginModal.addEventListener('click', (e) => { if (e.target === loginModal) closeModals(); });

  // Избранное (localStorage)
  function getFavs() {
    try { return JSON.parse(localStorage.getItem('kley_favs')||'[]'); } catch { return []; }
  }
  function saveFavs(arr) { localStorage.setItem('kley_favs', JSON.stringify(arr)); }
  favBtns.forEach(b => {
    const card = b.closest('.card');
    const id = card.dataset.title;
    const favs = getFavs();
    if (favs.includes(id)) b.textContent = '♥';
    b.addEventListener('click', () => {
      const arr = getFavs();
      const idx = arr.indexOf(id);
      if (idx === -1) { arr.push(id); b.textContent = '♥'; } else { arr.splice(idx,1); b.textContent = '♡'; }
      saveFavs(arr);
    });
  });

  // Тема
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    document.body.classList.toggle('theme-light');
    const t = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    localStorage.setItem('kley_theme', t === 'light' ? 'light' : 'dark');
  });

  // Открыть форму логина
  loginBtn?.addEventListener('click', () => { loginModal.setAttribute('aria-hidden','false'); });

  // Мобильное меню
  menuToggle?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  });

  // Простая обработка формы (демо)
  const authForm = document.getElementById('authForm');
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(authForm);
    const name = data.get('name');
    const email = data.get('email');
    localStorage.setItem('kley_user', JSON.stringify({name,email}));
    closeModals();
    alert('Демо: вход выполнен как ' + name);
  });
});
