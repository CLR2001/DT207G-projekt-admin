const template1 = document.createElement('template');
template1.innerHTML = `
  <form class="edit-dish-form">
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
      <button class="submit-edit-button">Spara</button>
      <button class="exit-edit-button">Avbryt</button>
    </div>
    <ul class="message-list"></ul>
    <button type="button" class="exit-edit-button top-right-exit">
      <svg class="icon"><use href="#icon-hamburger-close"></use></svg>
    </button>
  </form>
`;
export const editDishModalTemplate = template1;