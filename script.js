const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!opened));
    nav.classList.toggle('is-open', !opened);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
