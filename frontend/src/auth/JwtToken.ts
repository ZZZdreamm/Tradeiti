export function saveToken(token: string) {
  localStorage.setItem("jwtToken", token);
}

export function getToken() {
  return localStorage.getItem("jwtToken");
}
