import type { Dish } from "../interfaces/dish.interface";
import { fetchCurrentDishesData, fetchWeekData } from "./fetch-data";
import { changeWeek, createMenu } from "./render-functions";

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