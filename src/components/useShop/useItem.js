import { useState, useEffect } from 'react';
import { useShopContext } from '../../context/shopContext';

//fetch item or find the item from the already loaded context
const useItem = (id) => {
  // const [items, setItems] = useState([]);
  const {items, setItems} = useShopContext();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (items.length !== 0) {
      console.log('item found in already fetched store');
      setItem(items.find(i => i.id === id));
      setIsLoading(false);
      return;
    }
    console.log('fetching item');
    const fetchData = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (response.status >= 400) {
      throw new Error("server error");
    }
    const itemData = await response.json();

    setItem(itemData);
    setIsLoading(false);
    }
    fetchData().catch(e => setError(e));
  }, [id]);
  return {error, item, isLoading};
}

export default useItem