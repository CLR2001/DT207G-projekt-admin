/**
 * @file Render Start
 * @module RenderStart
 * @description Module to render data for admin start page.
 */

import { verifyResponse } from "../global-functions";
import type { Dish } from "../interfaces/dish.interface";
import { fetchCurrentDishesData, fetchWeekData } from "./fetch-data";
import { createMenu } from "./render-functions";

/**
 * @function renderStartData
 * @description Fetches necessary data and renders it to admin start page by using different helper functions.
 */
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

/**
 * @function changeWeek
 * @description Changes value of active week that should be displayed on the frontend restaurant page.
 */
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