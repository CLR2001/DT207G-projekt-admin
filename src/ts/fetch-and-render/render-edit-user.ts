/**
 * @file Render Edit User
 * @module RenderEditUser
 * @description Renders data and creates logic for edit-user subpage.
 */

import { createDomElement, verifyResponse } from "../global-functions";
import type { User } from "../interfaces/user.interface";
import { fetchUsersData } from "./fetch-data";

/**
 * @function renderEditUserData
 * @description Creates HTML Elements and renders said elements to the edit-user subpage.
 */
export async function renderEditUserData()  {
  const users = await fetchUsersData();
  
  const container = document.querySelector<HTMLElement>('.edit-users-main');

  users.forEach(user => {
    const div = createDomElement('div');
    div.classList.add('user-container');
    const nameContainer = createDomElement('p');
    const nameContent = createDomElement('b', `Användarnamn: ${user.username}`);
    nameContainer.append(nameContent);

    const email = createDomElement('p', `E-Post: ${user.email}`);

    const id = createDomElement('p', `ID: ${user._id}`);

    const deleteButton = createDomElement('button', 'Radera');
    deleteButton.classList.add('delete-user-button');

    deleteButton.addEventListener('click', () => {
      deleteUser(user, div);
    })

    div.append(nameContainer, email, id, deleteButton);
    container?.append(div);

  })
}

/**
 * @function deleteUser
 * @description Deletes user from database and removes DOM-element containing deleted data.
 * @param user User-object containing ID of user to delete.
 * @param container Container to remove from DOM when deleting user.
 */
async function deleteUser(user: User, container: HTMLElement): Promise<void> {
  try {
    const userConfirm = confirm(`Är du säker på att du vill radera användaren ${user.username.toLocaleUpperCase()}? Detta går inte att ångra!`);

    if (userConfirm) {
      const response = await fetch(`https://projekt.api.clr-server.com/users/${user._id}`, {
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