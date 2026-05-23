/**
 * @file Navigation Handler
 * @module NavigationHandler
 * @description Handles the navigation logic, including hamburger menu functionality and accessibility.
 */

import { startTemplate,  addDishTemplate,  editDishTemplate, registerTemplate, editUserTemplate } from "./pages/admin-templates";
import { register } from "./register";
import { renderEditDishData, renderEditUserData, renderStartData } from "./render-data";

/**
 * @function initNavigation
 * @description Initializes the navigation functionality.
 */
export function initNavigation(): void {
  // 1. Selects DOM elements
  const nav = document.querySelector<HTMLElement>('.nav-list');
  const header = document.querySelector<HTMLElement>('header');
  const navigationButtons = document.querySelectorAll<HTMLButtonElement>('.nav-list button:not(.log-out-button)');
  if (!nav || !header) return;

  // 2. Creates hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.type = 'button';
  hamburgerButton.classList.add('hamburger-button');
  hamburgerButton.ariaLabel = 'Open main menu';

  hamburgerButton.innerHTML = `<svg class="icon"><use href="#icon-hamburger-open"></use></svg>`;
  const headerContent = document.querySelector<HTMLDivElement>('.header-content')
  headerContent?.append(hamburgerButton);

  // 3. Initial runs on load
  updateScrollbarWidth();
  headerHeight(header);

  // 4. Event listeners for window resizing and UI updates
  window.addEventListener('resize', () =>{
    updateScrollbarWidth();
    headerHeight(header);
    if (window.innerWidth > 991 && nav.dataset.open === "true"){
      closeMenu(nav, hamburgerButton);
    }
  });

  // 5. Hamburger button functionality
  hamburgerButton.addEventListener('click', () => {
    const toOpen = nav.dataset.open !== "true";
    nav.dataset.open = toOpen.toString();
    toggleInert(toOpen);
    
    const icon = toOpen ? 'close' : 'open';
    hamburgerButton.innerHTML = `<svg class="icon"><use href="#icon-hamburger-${icon}"></use></svg>`;
  });

  // 6. Closes menu when clicking on button
  navigationButtons.forEach(button => {
    button.addEventListener('click', () => closeMenu(nav, hamburgerButton));
  });

  applyButtonLogic();
}

/**
 * @function closeMenu
 * @description Closes the navigation menu.
 * @param {HTMLElement} nav - The navigation element to close.
 * @param {HTMLButtonElement} hamburgerButton - Button to open/close hamburger menu.
 */
function closeMenu(nav: HTMLElement, hamburgerButton: HTMLButtonElement): void {
  if (!nav || !hamburgerButton) return;

  nav.dataset.open = "false";
  toggleInert(false);
  hamburgerButton.innerHTML = '<svg class="icon"><use href="#icon-hamburger-open"></use></svg>';
}

/**
 * @function toggleInert
 * @description Toggles the 'inert' attribute on all main body elements except the header.
 * @param {boolean} value - True to set elements as inert, false to remove.
 */
function toggleInert(value: boolean): void {
  const elements = document.querySelectorAll<HTMLElement>('body > :not(header, #app), .admin-main > :not(aside)');

  elements.forEach(element => {
    element.inert = value;
  });
}

/**
 * @function updateScrollbarWidth
 * @description Calculates and updates the --scrollbar-width CSS variable.
 */
function updateScrollbarWidth(): void{
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}

/**
 * @function headerHeight
 * @description Calculates the current header height and updates the --header-height CSS variable.
 */
function headerHeight(header: HTMLElement): void {
  if (!header) return;
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`); 
}

/**
 * @function applyButtonLogic
 * @description Applies logic to nav-buttons.
 */
function applyButtonLogic(): void {
  const adminContentContainer = document.querySelector<HTMLElement>('.admin-content');
  
  const adminUIButton = document.querySelector<HTMLButtonElement>('#start');
  const addDishUIButton = document.querySelector<HTMLButtonElement>('#add-dish');
  const editDishUIButton = document.querySelector<HTMLButtonElement>('#edit-dish');
  const registerUIButton = document.querySelector<HTMLButtonElement>('#register');
  const editUserUIButton = document.querySelector<HTMLButtonElement>('#edit-user');

  const allButtons = [adminUIButton, addDishUIButton, editDishUIButton, registerUIButton, editUserUIButton];

  const setActiveButton = (clickedButton: HTMLButtonElement) => {
    allButtons.forEach(button => {
      button?.classList.remove('active-button');
    });
    if (clickedButton) clickedButton.classList.add('active-button');
  };
  
  adminUIButton?.addEventListener('click', () => {
    adminContentContainer?.replaceChildren();
    adminContentContainer?.appendChild(startTemplate.content.cloneNode(true));
    setActiveButton(adminUIButton);
    renderStartData();
  });

  addDishUIButton?.addEventListener('click', () => {
    adminContentContainer?.replaceChildren();
    adminContentContainer?.appendChild(addDishTemplate.content.cloneNode(true));
    setActiveButton(addDishUIButton);
  });

  editDishUIButton?.addEventListener('click', () => {
    adminContentContainer?.replaceChildren();
    adminContentContainer?.appendChild(editDishTemplate.content.cloneNode(true));
    setActiveButton(editDishUIButton);
    renderEditDishData();
  });

  registerUIButton?.addEventListener('click', () => {
    adminContentContainer?.replaceChildren();
    adminContentContainer?.appendChild(registerTemplate.content.cloneNode(true));
    setActiveButton(registerUIButton);

    const registerButton = document.querySelector<HTMLButtonElement>('.register-button');
    registerButton?.addEventListener('click', (event) => {
      event.preventDefault();
      register();
    });

    const form = document.querySelector<HTMLFormElement>('.register-form');
    const clearButton = document.querySelector<HTMLButtonElement>('.clear-button');
    clearButton?.addEventListener('click', (event) => {
      event.preventDefault();
      form?.reset()

      const messageList = document.querySelector<HTMLUListElement>('.message-list');
      messageList?.replaceChildren();
    });
  });

  editUserUIButton?.addEventListener('click', () => {
    adminContentContainer?.replaceChildren();
    adminContentContainer?.appendChild(editUserTemplate.content.cloneNode(true));
    setActiveButton(editUserUIButton);
    renderEditUserData();
  });
}