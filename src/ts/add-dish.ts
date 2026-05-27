/**
 * @file Add dish
 * @module AddDish
 * @description Module to store dishes in API database.
 */

import { createDomElement, isInputEmpty, verifyResponse } from "./global-functions";

/**
 * @function addDish
 * @description Reads input data from form and stores values to database after validating inputs are correct type of data.
 */
export async function addDish() {
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
      const response = await fetch('https://projekt.api.clr-server.com/dishes/save', {
        method: 'POST',
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

      // Successful save
      const form = document.querySelector<HTMLFormElement>('.add-dish-form');
      form?.reset();
      messageList?.replaceChildren();
      const message = createDomElement('li', 'Rätten har sparats!');
      message.style.color = 'green';
      messageList?.append(message);

    } catch (error: any) {
      if (error.cause) {
        console.error("Error:", error.cause.error);
        console.error("Message:", error.cause.message);
        console.log('--- DETAILS ---');
        console.table(error.cause.details);
      }

      messageList?.replaceChildren();
      const message = createDomElement('li', error.cause?.message || 'Ett oväntat fel inträffade' );
      messageList?.append(message);
    } finally {
      const spinner = document.querySelector('.spinner');
      spinner?.remove();
    }
}

/**
 * @function getWeeksFromInput
 * @description Splits a string and creates an array of numbers from the split data.
 * @param input String of numbers separated by comma to be split up into an array.
 */
export function getWeeksFromInput(input: string): number[] {
  const allWeeksCheckbox = document.querySelector<HTMLInputElement>('#all-weeks');
  if (allWeeksCheckbox?.checked) {
    return [];
  }
  
  const weeksArray: number[] = input
    .split(',')
    .map(week => Number(week.trim()))
    .filter(week => !Number.isNaN(week) && week >= 1 && week <= 52);

    console.log(weeksArray);
    
  return weeksArray;
}