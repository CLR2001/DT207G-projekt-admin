import { createDomElement, isInputEmpty, verifyToken } from "./global-functions";

/**
 * @function register
 * @description Function to register account via API.
 */

export async function register(): Promise<void> {
  const usernameInput = document.querySelector<HTMLInputElement>('#username')?.value;
  const emailInput = document.querySelector<HTMLInputElement>('#e-mail')?.value;
  const passwordInput = document.querySelector<HTMLInputElement>('#password')?.value;
  const messageList = document.querySelector<HTMLUListElement>('.message-list');
  messageList?.replaceChildren();

   /* ---------------------------- Input validation ---------------------------- */
  const messageArray: Array<string> = [];
  isInputEmpty(usernameInput as string, 'Användarnamn får inte vara tomt', messageArray);
  isInputEmpty(emailInput as string, 'E-post får inte vara tomt', messageArray);
  if (emailInput && !emailInput.includes('@')) {
    messageArray.push('Vänligen skriv in en giltlig e-post')
  }
  isInputEmpty(passwordInput as string, 'Lösenord får inte vara tomt', messageArray);
  if(passwordInput?.trim() !== '' && passwordInput?.length as number < 8) {
    messageArray.push('Lösenord måste vara minst åtta tecken')
  }

  if (messageArray.length > 0) {
    messageList?.replaceChildren();
    messageArray.forEach(message => {
      const li = document.createElement('li');
      li.textContent = message;
      messageList?.append(li);
    });
    return;
  }

  const container = document.querySelector<HTMLFormElement>('.register-form')
  const spinner = createDomElement('span');
  spinner.classList.add('spinner');
  container?.append(spinner);
  try {
    const response = await fetch('https://projekt.api.clr-server.com/authentication/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'username': usernameInput,
        'email': emailInput,
        'password': passwordInput
      }),
      credentials: 'include'
    });

    await verifyToken(response);

    /* ------------------------- Successful registration ------------------------ */
    const form = document.querySelector<HTMLFormElement>('.register-form');
    form?.reset();
    messageList?.replaceChildren();
    const message = createDomElement('li', 'Kontoregistreringen lyckades');
    message.style.color = 'green';
    messageList?.append(message);

  } catch (error: any) {
    console.error("Status:", error.status);
    console.error("Error:", error.error);
    console.error("Message:", error.message);

    messageList?.replaceChildren();
    const message = createDomElement('li', error.message);
    messageList?.append(message);
  } finally {
    const spinner = document.querySelector('.spinner');
    spinner?.remove();
  }
}