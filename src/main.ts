import './scss/main.scss';
import { closeModal } from './ts/global-functions';
import { initIcons } from './ts/icon-loader';
import { initPageHandler } from './ts/page-handler';
import { initThemeHandler } from './ts/theme-handler';

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initThemeHandler();
  initPageHandler();
  const modal = document.querySelector<HTMLElement>('.modal');
  modal?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  });
});
