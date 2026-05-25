import { fetchDishesData, fetchCurrentDishesData, fetchUsersData, fetchWeekData } from "./fetch-data";
import { closeModal, createDomElement, openModal, verifyResponse } from "./global-functions";
import type { Dish } from "./interfaces/dish.interface";
import { editDishModalTemplate } from "./pages/modal-templates";

export async function renderStartData()  {
  const currentWeek = await fetchWeekData();
  const week = document.querySelector<HTMLInputElement>('#week');
  const currentWeekSpan = document.querySelector<HTMLSpanElement>('#current-week');
  if (week && currentWeekSpan) {
    week.value = currentWeek.toString();
    currentWeekSpan.textContent = currentWeek.toString();
  }
  const updateWeekButton = document.querySelector<HTMLButtonElement>('.update-week-button');
  updateWeekButton?.addEventListener('click', changeWeek);

  const dishes: Dish[] = await fetchCurrentDishesData();

  createMenu(dishes, false);
}

export async function renderEditDishData()  {
  fetchDishesData();
  const dishes: Dish[] = await fetchCurrentDishesData();

  createMenu(dishes, true);
}

export async function renderEditUserData()  {
  fetchUsersData();
}

async function changeWeek(): Promise<void> {
  try {
    const week = document.querySelector<HTMLInputElement>('#week')?.valueAsNumber

    const userConfirm = confirm('Detta kommer att ändra vilken veckomeny som visas på er webbplats. Är du säker?');

    if (userConfirm) {
      const response = await fetch('https://projekt.api.clr-server.com/settings/current-week', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'week': Number(week)
        }),
        credentials: 'include'
      });

      await verifyResponse(response);

      alert('Vecka uppdaterad till ' + week);
      renderStartData();
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

function createMenu(dishes: Dish[], editable: boolean): void {
  /* ------------------------- Create menu categories ------------------------- */
  const appetizersContainer = document.querySelector<HTMLDivElement>('.appetizers');
  appetizersContainer?.replaceChildren();
  const appetizersH3 = createDomElement('h3', 'Förrätter');
  appetizersContainer?.append(appetizersH3);

  const mainsContainer = document.querySelector<HTMLDivElement>('.mains');
  mainsContainer?.replaceChildren();
  const mainsH3 = createDomElement('h3', 'Huvudrätter');
  mainsContainer?.append(mainsH3);

  const dessertsContainer = document.querySelector<HTMLDivElement>('.desserts');
  dessertsContainer?.replaceChildren();
  const dessertsH3 = createDomElement('h3', 'Desserter');
  dessertsContainer?.append(dessertsH3);

  const drinksContainer = document.querySelector<HTMLDivElement>('.drinks');
  drinksContainer?.replaceChildren();
  const drinksH3 = createDomElement('h3', 'Dryck');
  drinksContainer?.append(drinksH3);

  /* ------------------------ Create and render dishes ------------------------ */
  dishes.forEach(dish => {
    const dishContainer = createDomElement('div');
    dishContainer.classList.add('dish-container');

    const dishTitle = createDomElement('p');
    const dishTitleContent = createDomElement('b', dish.name);
    dishTitle.append(dishTitleContent);

    const dishDescription = createDomElement('p', dish.description);

    const dishPrice = createDomElement('p', `${dish.price.toString()} :-`);

    dishContainer.append(dishTitle, dishDescription, dishPrice);

    if (editable) {
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


function createEditButton(dish: Dish): HTMLButtonElement {
  const editButton = createDomElement('button', 'Redigera');
  editButton.classList.add('edit-dish-button');
  
  editButton.addEventListener('click', () => { 
    /* -------------------------- Create Modal Content -------------------------- */
    const modal = document.querySelector<HTMLElement>('.modal');
    modal?.replaceChildren();
    modal?.appendChild(editDishModalTemplate.content.cloneNode(true));
    
    const exitButton = document.querySelector<HTMLButtonElement>('.exit-edit-button');
    exitButton?.addEventListener('click', (event) => {
      event.preventDefault();
        closeModal();
      });
      
      const submitButton = document.querySelector<HTMLButtonElement>('.submit-edit-button');
      submitButton?.addEventListener('click', () => {
        editDish(dish);
        closeModal()
      });
      
      /* ------------------------------- Open modal ------------------------------- */
      openModal();
    });
    
    return editButton as HTMLButtonElement;
  }
  
  function createDeleteButton(container: HTMLElement, dish: Dish): HTMLButtonElement {
    const deleteButton = createDomElement('button', 'Radera');
    deleteButton.classList.add('delete-dish-button');
    deleteButton.addEventListener('click', () => {
      deleteDish(dish._id);
    container.remove();
  });
  
  return deleteButton as HTMLButtonElement;
}

async function editDish(dish: Dish): Promise<void> {
  try {
    
    const userConfirm = confirm(`Är du säker att du vill uppdatera rätten: ${dish.name}`);

    if (userConfirm) {
      const response = await fetch(`https://projekt.api.clr-server.com/dishes/${dish._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(),
        credentials: 'include'
      });

      await verifyResponse(response);

      alert('Rätten har uppdaterats');
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

async function deleteDish(id: string): Promise<void> {
  
}