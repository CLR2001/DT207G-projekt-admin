/**
 * @file Global Functions
 * @module GlobalFunctions
 * @description Contains useful export functions for use in other files.
 */

import type { ApiError } from "./interfaces/api-error.interface";

/**
 * @function createDomElement
 * @description Creates and returns an HTML element.
 */
export function createDomElement(tag: string, text: string = ''): HTMLElement {
  const e = document.createElement(tag);
  e.textContent = text;
  return e;
}

/**
 * @function isInputEmpty
 * @description Checks if input is empty and adds warning message to an array.
 * @param input Input to check.
 * @param message Message to add to array in case of empty input.
 * @param array Array to store messsages.
 */
export function isInputEmpty(input: string, message: string, array: Array<string>) {
  if(!input || input.trim() === "") {
      array.push(message);    
    }
}

/**
 * @function verifyResponse
 * @description Checks a response to see if it was ok.
 * @param response Response to check.
 */
export async function verifyResponse(response: Response): Promise<void> {
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message, { cause: { ...errorData, status: response.status } });
  }
}

/**
 * @function openModal
 * @description Opens modal.
 */
export function openModal(){
  const body = document.querySelector<HTMLBodyElement>('body');
  const header = document.querySelector<HTMLElement>('header');
  const main = document.querySelector<HTMLElement>('main');
  const footer = document.querySelector<HTMLElement>('footer');
  const modal = document.querySelector<HTMLElement>('.modal');
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (!body || !header || !main || !footer || !modal ) {
    return;
  }
  modal.classList.remove('hidden');
  body.classList.add('no-scroll');
  body.style.paddingRight = `${scrollbarWidth}px`;
  header.inert = true;
  main.inert = true;
  footer.inert = true;
}

/**
 * @function closeModal
 * @description Closes modal.
 */
export function closeModal(){
  const body = document.querySelector<HTMLBodyElement>('body');
  const header = document.querySelector<HTMLElement>('header');
  const main = document.querySelector<HTMLElement>('main');
  const footer = document.querySelector<HTMLElement>('footer');
  const modal = document.querySelector<HTMLElement>('.modal');
  if (!body || !header || !main || !footer || !modal ) {
    return;
  }
  modal.classList.add('hidden');
  body.classList.remove("no-scroll");
  body.style.paddingRight = "0";
  header.inert = false;
  main.inert = false;
  footer.inert = false;
}