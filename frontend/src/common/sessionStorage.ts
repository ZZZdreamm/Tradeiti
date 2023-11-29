export function saveInSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function getFromSessionStorage(key: string) {
  return sessionStorage.getItem(key);
}

export function getMultipleValuesFromSessionStorage(keys: string[]) {
  const values: any = {};
  keys.forEach((key) => {
    const value = getFromSessionStorage(key);
    values[key] = value ? JSON.parse(value) : "";
  });
  return values;
}

export function removeFromSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
