import { useState, useEffect } from 'react';
import requestItem from './requestItem';
//fetch all items
const useShop = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log('fetching items');
    const fetchData = async () => {
    const itemData = await requestItem.processAllData();

    const trueItems = itemData.filter(i => i.inStore === true && i.requiredChampion === '');
    // removes a lot of effects coded as items
    // and champ-specifc items like kalista blackspear or fiddle trinket
    // if we want, we can further remove trinkets with && !(i.categories.includes('Trinket'))
    setItems(trueItems);
    setIsLoading(false);
    }
    fetchData().catch(e => setError(e));
  }, []);
  return {error, items, isLoading};
}

export default useShop