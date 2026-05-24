const template1 = document.createElement('template');
template1.innerHTML = `
 <h1>Start</h1>
  <div class="change-week-container">
    <label for="week">Välj ny vecka:</label>
    <input type="number" min="1" max="52" name="week" id="week">
    <button type="button" class="update-week-button">Spara ändring</button>
  </div>
  <section class="start-main">
    <h2>Nuvarande meny (vecka: <span id="current-week"></span>)</h2>
    <div class="menu-container"></div>
  </section>
`;
export const startTemplate = template1;

const template2 = document.createElement('template');
template2.innerHTML = `
  <h1>Lägg till rätt</h1>
  <form class="add-dish-form">
    <div>
      <label for="name" id="name-label">Namn:</label>
      <input type="text" name="username" id="name" autocomplete="off">
    </div>
    <div>
      <label for="description">Beskrivning:</label>
      <textarea name="description" id="description" autocomplete="off"></textarea>
    </div>
    <div>
      <label for="price">Pris:</label>
      <input type="number" value="0" name="price" id="price" autocomplete="off">
    </div>
    <div class="week-input">
      <label for="week">Vecka:</label>
      <input type="number" min="1" max="52" value="1" name="week" id="week">
    </div>
    <div>
      <label for="category">Kategori:</label>
      <select name="category" id="category">
        <option value="Förrätt">Förrätt</option>
        <option value="Huvudrätt">Huvudrätt</option>
        <option value="Dessert">Dessert</option>
        <option value="Dryck">Dryck</option>
      </select>
    </div>
    <div class="buttons-container">
      <button class="add-dish-button">Lägg till</button>
      <button class="clear-button">Rensa</button>
    </div>
    <ul class="message-list"></ul>
  </form>
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
      <label for="username" id="username-label">Användarnamn:</label>
      <input type="text" name="username" id="username" autocomplete="off">
    </div>
    <div>
      <label for="e-mail">E-post:</label>
      <input type="email" name="e-mail" id="e-mail" autocomplete="off">
    </div>
    <div>
      <label for="password">Lösenord:</label>
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