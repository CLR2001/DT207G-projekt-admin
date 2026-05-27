const template1 = document.createElement('template');
template1.innerHTML = `
 <h1>Start</h1>
  <div class="change-week-container">
    <label for="week">Uppdatera aktiv vecka:</label>
    <input type="number" min="1" max="52" name="week" id="week">
    <button type="button" class="update-week-button">Spara</button>
  </div>
  <section class="start-main">
    <div class="menu-header">
      <h2>Nuvarande meny</h2>
      <p>Vecka: <span id="current-week"></span></p>
    </div>
    <div class="menu-container">
      <div class="appetizers">
        <h3>Förrätter</h3>
        <div class="appetizers-content"></div>
      </div>
      <div class="mains">
        <h3>Huvudrätter</h3>
        <div class="mains-content"></div>
        </div>
      <div class="desserts">
        <h3>Desserter</h3>
        <div class="desserts-content"></div>
      </div>
      <div class="drinks">
        <h3>Dryck</h3>
        <div class="drinks-content"></div>
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
      <input type="number" name="price" id="price" placeholder="0" autocomplete="off">
    </div>
    <div class="week-input">
      <div class="specific-weeks">
        <label for="specific-weeks">Välj specifika veckor mellan 1 och 52 (separera med kommatecken):</label>
        <input type="text" name="specific-weeks" id="specific-weeks" placeholder="Ex: 10, 11, 12" autocomplete="off">
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
  <h1>Redigera rätter</h1>
  <div class="filter-container">
    <label for="category-filter">Kategori:</label>
    <select name="category-filter" id="category-filter">
      <option value="all">Alla</option>
      <option value="appetizer">Förrätter</option>
      <option value="main">Huvudrätter</option>
      <option value="dessert">Desserter</option>
      <option value="drink">Dryck</option>
    </select>
    <label for="week-filter">Vecka:</label>
    <select name="week-filter" id="week-filter">
      <option value="all">Alla</option>
      <option value="permanent">Permanenta</option>
    </select>
  </div>
  <div class="menu-container">
    <div class="category-container appetizers">
      <h3>Förrätter</h3>
      <div class="appetizers-content"></div>
    </div>
    <div class="category-container mains">
      <h3>Huvudrätter</h3>
      <div class="mains-content"></div>
      </div>
    <div class="category-container desserts">
      <h3>Desserter</h3>
      <div class="desserts-content"></div>
    </div>
    <div class="category-container drinks">
      <h3>Dryck</h3>
      <div class="drinks-content"></div>
    </div>
  </div>
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
  <h1>Hantera användare</h1>
  <section class="edit-users-main"></section>
`;
export const editUserTemplate = template5;