import type { Dish } from "./interfaces/dish.interface";
import type { User } from "./interfaces/user.interface";
import { verifyToken } from "./global-functions";

export async function fetchDishesData(): Promise<Dish[]> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/dishes', {
      method: 'GET',
      credentials: 'include'
    });

    await verifyToken(response);

    const dishes: Dish[] = await response.json();  
    return dishes;
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function fetchUsersData(): Promise<User[]> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/users', {
      method: 'GET',
      credentials: 'include'
    });

    await verifyToken(response);

    const users: User[] = await response.json();  
    return users;
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}