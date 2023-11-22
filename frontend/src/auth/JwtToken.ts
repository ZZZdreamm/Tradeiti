import { ACCESS_TOKEN, JWT_TOKEN } from "../config/constants";

export function saveToken(token: string) {
  localStorage.setItem(JWT_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(JWT_TOKEN);
}

export function removeJwtToken() {
  localStorage.removeItem(JWT_TOKEN);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
