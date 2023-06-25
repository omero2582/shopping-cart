import { useState, useEffect } from 'react';
import requestItem from './requestItem';
//fetch all items
const useShop = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('fetching items');
    const fetchData = async () => {
      let itemData;
      try {
        itemData = await requestItem.processAllData();
      } catch (error) {
        itemData = []
      }
      const trueItems = itemData.filter(i => i.inStore === true && i.requiredChampion === '');
      // removes a lot of effects coded as items
      // and champ-specifc items like kalista blackspear or fiddle trinket
      // if we want, we can further remove trinkets with && !(i.categories.includes('Trinket'))
      setItems(trueItems);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return {items, isLoading};
}

export default useShop