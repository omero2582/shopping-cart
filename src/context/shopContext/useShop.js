import { useState, useEffect } from 'react';
import { useShopContext } from './shopContext';

//fetch all items
const useShop = () => {
  // const [items, setItems] = useState([]);
  const {items, setItems} = useShopContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log('fetching shop');
    const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.status >= 400) {
      throw new Error("server error");
    }
    const itemData = await response.json();

    setItems(itemData);
    setIsLoading(false);
    }
    fetchData().catch(e => setError(e));
  }, []);
  return {error, items, isLoading};
}

export default useShop