const template1 = document.createElement('template');
template1.innerHTML = `
 <h1>Start</h1>
  <div class="change-week-container">
    <label for="week">Välj ny vecka att visa på webbplatsen:</label>
    <input type="number" min="1" max="52" name="week" id="week">
    <button type="button" class="update-week-button">Spara ändring</button>
  </div>
  <section class="start-main">
    <h2>Nuvarande meny (vecka: <span id="current-week"></span>)</h2>
    <div class="menu-container">
      <div class="appetizers">
        <h3>Förrätter</h3>
      </div>
      <div class="mains">
        <h3>Huvudrätter</h3>
      </div>
      <div class="desserts">
        <h3>Desserter</h3>
      </div>
      <div class="drinks">
        <h3>Dryck</h3>
      </div>
    </div>
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
      <div class="specific-weeks">
        <label for="specific-weeks">Välj specifika veckor mellan 1 och 52 (separera med kommatecken):</label>
        <input type="text" name="specific-weeks" id="specific-weeks" placeholder="Ex: 10, 11, 12">
      </div>
      <p class="or-text">eller</p>
      <label for="all-weeks">
        <input type="checkbox" name="all-weeks" id="all-weeks"> Alltid på menyn (alla veckor)
      </label>
    </div>
    <div>
      <label for="category">Kategori:</label>
      <select name="category" id="category">
        <option value="appetizer">Förrätt</option>
        <option value="main">Huvudrätt</option>
        <option value="dessert">Dessert</option>
        <option value="drink">Dryck</option>
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