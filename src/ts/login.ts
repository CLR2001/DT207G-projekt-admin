/**
 * @file Login
 * @module Login
 * @description Handles the communication with the API when logging in and out.
 */

/**
 * @function loggedInStatusOnLoad
 * @description Checks whether user has a valid token stored and automatically logs in if token is valid.
 */
export async function loggedInStatusOnLoad(): Promise<void> {
  const token = localStorage.getItem('token');
  
  if (!token) {

    return;
  }

  try {
    const response = await fetch('https://projekt.api.clr-server.com/authentication/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      
    }
  } catch (error) {
    
  }
}