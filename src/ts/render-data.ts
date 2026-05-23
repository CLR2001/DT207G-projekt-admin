import { fetchDishesData, fetchUsersData } from "./fetch-data";

export function renderStartData()  {
  fetchDishesData();
}

export function renderEditDishData()  {
  fetchDishesData();
}

export function renderEditUserData()  {
  fetchUsersData();
}