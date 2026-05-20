/**
 * @file Login
 * @module Login
 * @description Handles the communication with the API when logging in and out.
 */

import type { Pages } from "./interfaces/pages.interface";
import { renderPageContent } from "./page-handler";
import { pageTemplate } from "./pages/admin-page";
import { createDomElement, isInputEmpty } from "./global-functions";
import { ApiError } from "./classes/api-error.class";

const app = document.querySelector('#app') as HTMLElement;
const pages: Pages = {
  admin: pageTemplate
};

export function initLogin(): void {
  loggedInStatusOnLoad();
  const loginButton = document.querySelector<HTMLButtonElement>('.log-in-button');
  loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    logIn();
  });
}

/**
 * @function loggedInStatusOnLoad
 * @description Checks whether user has a valid token stored and automatically logs in if token is valid.
 */
export async function loggedInStatusOnLoad(): Promise<void> {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return;
  }

  try {
    const response = await fetch('https://projekt.api.clr-server.com/authentication/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      applyLoggedInUI();
    } else {
      return;
    }
  } catch (error) {
    console.error('Kunde inte logga in:', error);
    return;
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
    const messageList = document.querySelector<HTMLUListElement>('.message-list');
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
      })
    });

    if (!response.ok) {
      throw new Error('Misslyckad inloggning');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
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

function applyLoggedInUI(): void {
  const status = document.querySelector<HTMLSpanElement>('.logged-in-status');
  if (status) {
    status.textContent = 'Ja';
    status.style.color = 'green';
  }
  renderPageContent(app, pages, 'admin', false);
}