export const getItemFromStorage = (key: string) => {
    const storageValue = localStorage.getItem(key);
  
    if (storageValue) {
      return JSON.parse(storageValue);
    }
  
    return undefined;
  };
  
  export const setItemToStorage = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const clearItemFromStorage = (key: string) =>
    localStorage.removeItem(key);