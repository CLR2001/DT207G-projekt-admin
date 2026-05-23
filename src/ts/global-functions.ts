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
 * @function verifyToken
 * @description Checks a response to see if it was ok.
 * @param response Response to check.
 */
export async function verifyToken(response: Response) {
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new Error(errorData.message);
  }
}