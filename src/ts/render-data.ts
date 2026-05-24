import { fetchDishesData, fetchCurrentDishesData, fetchUsersData, fetchWeekData } from "./fetch-data";
import { createDomElement } from "./global-functions";
import type { Dish } from "./interfaces/dish.interface";

export async function renderStartData()  {
  const currentWeek = await fetchWeekData();
  const week = document.querySelector<HTMLInputElement>('#week');
  const currentWeekSpan = document.querySelector<HTMLInputElement>('#current-week');
  if (week && currentWeekSpan) {
    week.value = currentWeek.toString();
    currentWeekSpan.textContent = currentWeek.toString();
  }

  const dishes: Dish[] = await fetchCurrentDishesData();

  const appetizersContainer = document.querySelector<HTMLDivElement>('.appetizers');
  const mainsContainer = document.querySelector<HTMLDivElement>('.mains');
  const dessertsContainer = document.querySelector<HTMLDivElement>('.desserts');
  const drinksContainer = document.querySelector<HTMLDivElement>('.drinks');

  dishes.forEach(dish => {
    const dishContainer = createDomElement('div');
    dishContainer.classList.add('dish-container');

    const dishTitle = createDomElement('p');
    const dishTitleContent = createDomElement('b', dish.name);
    dishTitle.append(dishTitleContent);

    const dishDescription = createDomElement('p', dish.description);

    const dishPrice = createDomElement('p', `${dish.price.toString()} :-`);

    dishContainer.append(dishTitle, dishDescription, dishPrice);

    if (dish.category.trim() === 'appetizer') {
      appetizersContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'main') {
      mainsContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'dessert') {
      dessertsContainer?.append(dishContainer);
    } else if (dish.category.trim() === 'drink') {
      drinksContainer?.append(dishContainer);
    } 
  })
}

export function renderEditDishData()  {
  fetchDishesData();
}

export function renderEditUserData()  {
  fetchUsersData();
}