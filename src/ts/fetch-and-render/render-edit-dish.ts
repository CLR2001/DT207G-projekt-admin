/**
 * @file Render Edit Dish
 * @module RenderEditDish
 * @description Renders data and creates logic for edit-dish subpage.
 */

import { getWeeksFromInput } from "../add-dish";
import { closeModal, isInputEmpty, verifyResponse } from "../global-functions";
import type { Dish } from "../interfaces/dish.interface";
import { fetchDishesData } from "./fetch-data";
import { createMenu, populateActiveWeeks } from "./render-functions";

/**
 * @function renderEditDishData
 * @description Creates HTML Elements and renders said elements to the edit-dish subpage.
 */
export async function renderEditDishData()  {
  const dishes: Dish[] = await fetchDishesData();
  createMenu(dishes, true);

  const categoryInput = document.querySelector<HTMLSelectElement>('#category-filter');
  categoryInput?.addEventListener('change', (event) => {
    if (!event.currentTarget) return;
    const target = event.currentTarget as HTMLSelectElement;
    const category = target.value;
    
    const categoryContainers = document.querySelectorAll<HTMLDivElement>('.category-container');

    categoryContainers.forEach(container => {
      if (category === 'all') {
        container.classList.remove('hidden');
      } else {

        if (container.classList.contains(category + 's')) {
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
        }
      }
    })
  });

  populateActiveWeeks(dishes);

  const weekFilter = document.querySelector<HTMLSelectElement>('#week-filter');
  weekFilter?.addEventListener('change', (event) => {
    if (!event.currentTarget) return;
    const target = event.currentTarget as HTMLSelectElement;
    const week = target.value;

    if (week === 'all') {
      createMenu(dishes, true);
    } else if (week === 'permanent') {
      const filteredDishes = dishes.filter(dish => dish.week.length === 0);
      createMenu(filteredDishes, true);
    } else {
      const filteredDishes = dishes.filter(dish => dish.week.includes(Number(week)));
      createMenu(filteredDishes, true);
    }
  });
}

/**
 * @function editDish
 * @description Reads and validates inputs and saves values to database.
 * @param dish Dish-object containing ID of dish to edit
 */
export async function editDish(dish: Dish): Promise<void> {
  const nameInput = document.querySelector<HTMLInputElement>('#name');
  const descriptionInput = document.querySelector<HTMLInputElement>('#description');
  const priceInput = document.querySelector<HTMLInputElement>('#price');
  const weekInput = document.querySelector<HTMLInputElement>('#specific-weeks');
  const allWeeksCheckbox = document.querySelector<HTMLInputElement>('#all-weeks');
  const categoryInput = document.querySelector<HTMLInputElement>('#category');
  const messageList = document.querySelector<HTMLUListElement>('.message-list');

  // Input validation
  const messageArray: Array<string> = [];
  isInputEmpty(nameInput?.value as string, 'Namn får inte vara tomt', messageArray);
  isInputEmpty(descriptionInput?.value as string, 'Beskrivning får inte vara tomt', messageArray);
  isInputEmpty(priceInput?.value as string, 'Pris får inte vara tomt', messageArray);
  if (!allWeeksCheckbox?.checked) {
    isInputEmpty(weekInput?.value as string, 'Vecka får inte vara tomt', messageArray);
  }
  isInputEmpty(categoryInput?.value as string, 'Kategori får inte vara tomt', messageArray);

  const isPriceNumber = !Number.isNaN(Number(priceInput?.value));
  if (priceInput?.value.trim() !== '' && !isPriceNumber) {
    messageArray.push('Pris måste vara ett nummer');
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
      
  try {
    const userConfirm = confirm(`Är du säker på att du vill uppdatera rätten ${dish.name.toLocaleUpperCase()}?`);

    if (userConfirm) {
      const response = await fetch(`https://projekt.api.clr-server.com/dishes/${dish._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'name': nameInput?.value.trim(),
          'description': descriptionInput?.value.trim(),
          'price': priceInput?.valueAsNumber,
          'week': getWeeksFromInput(weekInput?.value as string),
          'category': categoryInput?.value.trim()
      }),
        credentials: 'include'
      });

      await verifyResponse(response);

      closeModal();
      renderEditDishData();
    }
  } catch (error: any) {
    if (error.cause) {
        console.error("Error:", error.cause.error);
        console.error("Message:", error.cause.message);
        console.log('--- DETAILS ---');
        console.table(error.cause.details);
      }
      else {
        console.error(error);
      }
  }
}

/**
 * @function deleteDish
 * @description Deletes dish from database and removes DOM-element containing deleted data.
 * @param dish Dish-object containing ID of dish to delete.
 * @param container Container to remove from DOM when deleting dish.
 */
export async function deleteDish(dish: Dish, container: HTMLElement): Promise<void> {
  try{
    const userConfirm = confirm(`Är du säker på att du vill radera rätten ${dish.name.toLocaleUpperCase()}? Detta går inte att ångra!`);

    if (userConfirm) {
      const response = await fetch(`https://projekt.api.clr-server.com/dishes/${dish._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      await verifyResponse(response);

      container.remove();
    }
  } catch (error: any) {
    if (error.cause) {
      console.error("Error:", error.cause.error);
      console.error("Message:", error.cause.message);
      console.log('--- DETAILS ---');
      console.table(error.cause.details);
    }
    else {
      console.error(error);
    }
  }
}