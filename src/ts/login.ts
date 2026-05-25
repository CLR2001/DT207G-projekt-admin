/**
 * @file Login
 * @module Login
 * @description Handles the communication with the API when logging in and out.
 */

import { createDomElement, isInputEmpty } from "./global-functions";
import { initNavigation } from "./navigation";
import { pageTemplate as loginPageTemplate } from "./pages/index-page";
import { adminUI } from "./pages/admin-ui";
import { startTemplate } from "./pages/admin-templates";
import { renderStartData } from "./render-data";

const app = document.querySelector('#app') as HTMLElement;

export function initLogin(): void {
  loggedInStatusOnLoad();
  applyFormButtonListeners();
}

/**
 * @function loggedInStatusOnLoad
 * @description Checks whether user has a valid token stored and automatically logs in if token is valid.
 */
export async function loggedInStatusOnLoad(): Promise<void> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/authentication/verify', {
      method: 'GET',
      credentials: 'include'
    });

    if (response.ok) {
      applyLoggedInUI();
    } else {
      applyLoggedOutUI();
    }
  } catch (error) {
    console.error('Kunde inte logga in:', error);
    applyLoggedOutUI();
  }
}

/**
 * @function logIn
 * @description Function to log in to account via API.
 */
async function logIn(): Promise<void> {
  const usernameInput = document.querySelector<HTMLInputElement>('#username')?.value;
  const passwordInput = document.querySelector<HTMLInputElement>('#password')?.value;
  const messageList = document.querySelector<HTMLUListElement>('.message-list');
  messageList?.replaceChildren();

  // Input validation
  const messageArray: Array<string> = [];
  isInputEmpty(usernameInput as string, 'Användarnamn/e-post får inte vara tomt', messageArray);
  isInputEmpty(passwordInput as string, 'Lösenord får inte vara tomt', messageArray);

  if (messageArray.length > 0) {
    messageList?.replaceChildren();
    messageArray.forEach(message => {
      const li = document.createElement('li');
      li.textContent = message;
      messageList?.append(li);
    });
    return;
  }

  const container = document.querySelector<HTMLFormElement>('.log-in-form-content')
  const spinner = createDomElement('span');
  spinner.classList.add('spinner');
  container?.append(spinner);
  try {     
    const response = await fetch('https://projekt.api.clr-server.com/authentication/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'username': usernameInput,
        'password': passwordInput
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Misslyckad inloggning');
    }

    const data = await response.json();
    console.log(data.message);
    applyLoggedInUI();

  } catch (error) {
    const messageList = document.querySelector<HTMLUListElement>('.message-list');
    messageList?.replaceChildren();
    const message = createDomElement('li', 'Användarnamn/e-post eller lösenord var felaktigt');
    messageList?.append(message);
  } finally {
    const spinner = document.querySelector('.spinner');
    spinner?.remove();
  }
}

/**
 * @function logOut
 * @description Function to log out.
 */
export async function logOut(): Promise<void> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/authentication/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      applyLoggedOutUI();
    } else {
      console.error('Kunde inte logga ut från servern');
    }
  } catch (error) {
    console.error('Nätverksfel vid utloggning:', error);
  }
}

/**
 * @function applyLoggedInUI
 * @description Function to apply admin UI when logged in.
 */
function applyLoggedInUI(): void {
  app.replaceChildren();
  app.appendChild(adminUI.content.cloneNode(true));

  const adminContentContainer = document.querySelector<HTMLElement>('.admin-content');
  adminContentContainer?.replaceChildren();
  adminContentContainer?.appendChild(startTemplate.content.cloneNode(true));
  
  initNavigation();
  renderStartData();

  const logOutButton = document.querySelector<HTMLButtonElement>('.log-out-button');
  logOutButton?.addEventListener('click', () => {
    const userConfirmed = confirm('Är du säker på att du vill logga ut?');

    if (userConfirmed) {
      logOut();
      applyFormButtonListeners();
    }
  });
}

/**
 * @function applyLoggedOutUI
 * @description Function to apply logged out UI when logged out.
 */
function applyLoggedOutUI(): void {
  app.replaceChildren();
  app.appendChild(loginPageTemplate.content.cloneNode(true));

  const hamburgerButton = document.querySelector<HTMLButtonElement>('.hamburger-button');
  hamburgerButton?.remove();

  const loadingScreen = document.querySelector<HTMLDivElement>('.loading-screen');
  const logInForm = document.querySelector<HTMLElement>('.log-in-form');
  loadingScreen?.classList.add('hidden');
  logInForm?.classList.remove('hidden');

  applyFormButtonListeners();
}

/**
 * @function applyFormButtonListeners
 * @description Applies event listeners to buttons in log in form.
 */
function applyFormButtonListeners() {
  const loginButton = document.querySelector<HTMLButtonElement>('.log-in-button');
  loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    logIn();
  });

  const form = document.querySelector<HTMLFormElement>('.log-in-form-content');
  const clearButton = document.querySelector<HTMLButtonElement>('.clear-button');
  clearButton?.addEventListener('click', (event) => {
    event.preventDefault();
    form?.reset()

    const messageList = document.querySelector<HTMLUListElement>('.message-list');
    messageList?.replaceChildren();
  });
}