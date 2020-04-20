import { useState, useEffect } from "react";

const useLocalStorage = (key, value = null) => {
  const initialValue = localStorage.getItem(key) || value;
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    if (!item) {
      localStorage.removeItem(key);
    } else {  
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;