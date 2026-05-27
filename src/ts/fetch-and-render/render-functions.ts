/**
 * @file Render Functions
 * @module RenderFunctions
 * @description Contains functions that creates and renders data to DOM.
 */

import { closeModal, createDomElement, openModal } from "../global-functions";
import type { Dish } from "../interfaces/dish.interface";
import { editDishModalTemplate } from "../pages/modal-templates";
import { deleteDish, editDish } from "./render-edit-dish";

/**
 * @function createMenu
 * @description Creates HTML Elements and renders said elements to the menu subpage.
 * @param dishes Array of dishes that contains data to be rendered.
 * @param editable Whether the menu should contain buttons to edit the dishes. Used for the edit subpage.
 */
export function createMenu(dishes: Dish[], editable: boolean): void {
  /* ------------------------- Create menu categories ------------------------- */
  const appetizersContainer = document.querySelector<HTMLDivElement>('.appetizers-content');
  appetizersContainer?.replaceChildren();

  const mainsContainer = document.querySelector<HTMLDivElement>('.mains-content');
  mainsContainer?.replaceChildren();

  const dessertsContainer = document.querySelector<HTMLDivElement>('.desserts-content');
  dessertsContainer?.replaceChildren();

  const drinksContainer = document.querySelector<HTMLDivElement>('.drinks-content');
  drinksContainer?.replaceChildren();

  /* ------------------------ Create and render dishes ------------------------ */
  dishes.forEach(dish => {
    const dishContainer = createDomElement('div');
    dishContainer.classList.add('dish-container');

    const dishTitle = createDomElement('p');
    const dishTitleContent = createDomElement('b', dish.name);
    dishTitle.append(dishTitleContent);

    const dishDescription = createDomElement('p', dish.description);

    const dishPrice = createDomElement('p');
    if (editable) {
      dishPrice.textContent = `Pris: ${dish.price.toString()} :-`
    } else {
      dishPrice.textContent = `${dish.price.toString()} :-`;
    }

    dishContainer.append(dishTitle, dishDescription, dishPrice);

    if (editable) {
      const week = createDomElement('p');
      if (dish.week.length === 0) {
        week.textContent = 'V. Alla veckor';
      } else {
        const weekString = dish.week.join(', ');
        week.textContent = 'V. ' + weekString;
      }
      dishContainer.append(week);
      const buttonsContainer = createDomElement('div');
      buttonsContainer.classList.add('buttons-container-edit');

      const editButton = createEditButton(dish);
      const deleteButton = createDeleteButton(dishContainer, dish);

      buttonsContainer.append(editButton, deleteButton);
      dishContainer.append(buttonsContainer);
    }

    if (dish.category.trim() === 'appetizer') {
      appetizersContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'main') {
      mainsContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'dessert') {
      dessertsContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'drink') {
      drinksContainer?.append(dishContainer);
    } 
  });
}

/**
 * @function createEditButton
 * @description Creates button element with listener to save edits to database.
 * @param dish Dish-object containg ID of dish to edit.
 */
function createEditButton(dish: Dish): HTMLButtonElement {
  const editButton = createDomElement('button', 'Redigera');
  editButton.classList.add('edit-dish-button');
  
  editButton.addEventListener('click', () => { 
    /* -------------------------- Create Modal Content -------------------------- */
    const modal = document.querySelector<HTMLElement>('.modal');
    modal?.replaceChildren();
    modal?.appendChild(editDishModalTemplate.content.cloneNode(true));

    // Fill inputs with current data
    const nameInput = document.querySelector<HTMLInputElement>('#name');
    if (nameInput) nameInput.value = dish.name;

    const descriptionInput = document.querySelector<HTMLInputElement>('#description');
    if (descriptionInput) descriptionInput.value = dish.description;

    const priceInput = document.querySelector<HTMLInputElement>('#price');
    if (priceInput) priceInput.value = dish.price.toString();
    
    const allWeeksCheckbox = document.querySelector<HTMLInputElement>('#all-weeks');
    if(allWeeksCheckbox) {
      if (dish.week.length === 0) {
        allWeeksCheckbox.checked = true;
      } else {
        const weekInput = document.querySelector<HTMLInputElement>('#specific-weeks');
        if (!weekInput) return;
        const weekString = dish.week.join(', ');
        weekInput.value = weekString;
      }
    }

    const categoryInput = document.querySelector<HTMLInputElement>('#category');
    if (categoryInput) categoryInput.value = dish.category;
    
    // Creating event listeners for buttons
    const exitButtons = document.querySelectorAll<HTMLButtonElement>('.exit-edit-button');
    exitButtons.forEach(exitButton => {
      exitButton.addEventListener('click', (event) => {
        event.preventDefault();
        closeModal();
      });
    }); 
    const submitButton = document.querySelector<HTMLButtonElement>('.submit-edit-button');
    submitButton?.addEventListener('click', (event) => {
      event.preventDefault();
      editDish(dish);
    });
    
    openModal();
  });
  
  return editButton as HTMLButtonElement;
}
  
/**
 * @function createDeleteButton
 * @description Creates button element with listener to delete dish from database.
 * @param dish Dish-object containg ID of dish to delete.
 */
function createDeleteButton(container: HTMLElement, dish: Dish): HTMLButtonElement {
  const deleteButton = createDomElement('button', 'Radera');
  deleteButton.classList.add('delete-dish-button');
  deleteButton.addEventListener('click', () => {
    deleteDish(dish, container);
  });
  
  return deleteButton as HTMLButtonElement;
}

/**
 * @function populateActiveWeeks
 * @description Populates a select element with all weeks that contains at least one dish in database.
 * @param dishes Array of dishes that contains weeks to populate to week-select element.
 */
export function populateActiveWeeks(dishes: Dish[]) {
  const weekSelect = document.querySelector<HTMLSelectElement>('#week-filter');
  if (!weekSelect) return;

  const activeWeeks = dishes.flatMap(dish => dish.week);

  const activeWeeksNoDuplicates = [...new Set(activeWeeks)].sort((a, b) => a - b);

  activeWeeksNoDuplicates.forEach(week => {
    const option = createDomElement('option') as HTMLOptionElement;
    option.value = week.toString();
    option.textContent = `${week}`;
    weekSelect.append(option);
  });
}