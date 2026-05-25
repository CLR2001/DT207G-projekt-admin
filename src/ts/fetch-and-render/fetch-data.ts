import type { Dish } from "../interfaces/dish.interface";
import type { User } from "../interfaces/user.interface";
import { verifyResponse } from "../global-functions";

export async function fetchDishesData(): Promise<Dish[]> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/dishes', {
      method: 'GET',
      credentials: 'include'
    });

    await verifyResponse(response);

    const dishes: Dish[] = await response.json();  
    dishes.sort((a, b) => a.price - b.price);
    return dishes;
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function fetchCurrentDishesData(): Promise<Dish[]> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/dishes/current-week', {
      method: 'GET',
      credentials: 'include'
    });

    await verifyResponse(response);

    const dishes: Dish[] = await response.json();  
    dishes.sort((a, b) => a.price - b.price);
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

    await verifyResponse(response);

    const users: User[] = await response.json();  
    const usersWithoutAdmin = users.filter(
      (user) => user._id !== '6a0dd36e6a9ad42c8c29214f'
    );
    return usersWithoutAdmin;
    
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export async function fetchWeekData(): Promise<number> {
  try {
    const response = await fetch('https://projekt.api.clr-server.com/settings/current-week', {
      method: 'GET',
      credentials: 'include'
    });

    await verifyResponse(response);

    const week = await response.json();  
    return week.currentWeek;
    
  } catch (error: any) {
    console.log(error.message);
    return 1;
  }
}