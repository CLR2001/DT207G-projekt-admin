const template1 = document.createElement('template');
template1.innerHTML = `
  <h1>start</h1>

`;
export const startTemplate = template1;

const template2 = document.createElement('template');
template2.innerHTML = `
  <h1>adddish</h1>
`;
export const addDishTemplate = template2;

const template3 = document.createElement('template');
template3.innerHTML = `
  <h1>editdish</h1>
`;
export const editDishTemplate = template3;

const template4 = document.createElement('template');
template4.innerHTML = `
  <h1>Registrera användare</h1>
  <form class="register-form">
    <div>
      <label for="username" id="username-label">Användarnamn</label>
      <input type="text" name="username" id="username">
    </div>
    <div>
      <label for="e-mail">E-post</label>
      <input type="email" name="e-mail" id="e-mail">
    </div>
    <div>
      <label for="password">Lösenord</label>
      <input type="password" name="password" id="password" autocomplete="off">
    </div>
    <div class="buttons-container">
      <button class="register-button">Registrera</button>
      <button class="clear-button">Rensa</button>
    </div>
    <ul class="message-list"></ul>
  </form>
`;
export const registerTemplate = template4;

const template5 = document.createElement('template');
template5.innerHTML = `
  <h1>edituser</h1>
`;
export const editUserTemplate = template5;