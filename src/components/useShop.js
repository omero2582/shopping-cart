import { useState, useEffect } from 'react';
import requestItem from './requestItem';
//fetch all items
const useShop = () => {
  const [shop, setShop] = useState([]);
  useEffect(() => {
    console.log('fetching items');
    const fetchData = async () => {
      const itemData = await requestItem.processAllData();
      const trueItems = itemData.filter(i => i.inStore === true && i.requiredChampion === '');
      // removes a lot of effects coded as items
      // and champ-specifc items like kalista blackspear or fiddle trinket
      // if we want, we can further remove trinkets with && !(i.categories.includes('Trinket'))
      setShop(trueItems);
    }
    fetchData();
  }, []);
  return shop;
}

export default useShop