import type { Dish } from "./interfaces/dish.interface";
import type { ApiError } from "./interfaces/api-error.interface";
import { logOut } from "./login";

export async function fetchDishes(): Promise<Dish[]> {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      logOut();
      alert('Din token var inte giltlig, vänligen logga in igen');
    }

    const response = await fetch('https://lab4.api.clr-server.com/secret', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    await verifyToken(response);

    
  } catch (error) {
      return [];
  }
}

async function verifyToken(response: Response) {
  if (!response.ok) {
    throw new Error('Token inte giltlig eller serverfel');
  }
}