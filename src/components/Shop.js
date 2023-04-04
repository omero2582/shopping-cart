import React, { useMemo } from "react";
import ShopItem from './ShopItem'
import './Shop.css';
import { useSearchParams } from "react-router-dom";
import useShop from "./useShop";

const sortItems = (items, sort) => {
  console.log(`sort ${sort}`);
  switch(sort) {
    case 'name-asc':
      return [...items].sort((a, b) =>  a.name.localeCompare(b.name));
    case 'name-desc':
      return [...items].sort((a, b) =>  b.name.localeCompare(a.name));
    case 'price-asc':
      return [...items].sort((a, b) =>  b.priceTotal - a.priceTotal);
    case 'price-desc':
    default:
      return [...items].sort((a, b) =>  a.priceTotal - b.priceTotal);
  }
}

const filterItems = (items, filter) => {
  console.log(`filter ${filter}`);
  if(!filter) return [...items];
  if(filter === 'ad'){
    return items.filter(p => p.categories.includes('Damage'));
  }else if(filter ==='ap'){
    return items.filter(p => p.categories.includes('SpellDamage'));
  }else {
    return [...items];
  }
};

export function Shop({cartActions}) {
  const [searchParams, setSearchParams] = useSearchParams('');
  const filter = searchParams.get('category');
  const sort = searchParams.get('sort');
  // fetch shop
  const items = useShop();  
  console.log('SHOP');

  //filter first
  const filteredItems = useMemo(() => {
    return filterItems(items, filter);
  }, [items, filter]);
  
  //then sort
  let processedItems = useMemo( () => {
    return sortItems(filteredItems, sort);
  }, [filteredItems, sort]);

  const handleSort = (e) => {
    setSearchParams({...Object.fromEntries(searchParams.entries()), sort: e.target.value})
    // preserves all other search params
  };

  return(
    <div className="shop">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSearchParams({})}>All</li>
          <li onClick={() => setSearchParams({category: 'ad'})}>AD</li>
          <li onClick={() => setSearchParams({category: 'ap'})}>AP</li>
          {/* Clears all other search params. Intended */}
        </ul>
      </div>
      <div className="sort">
        <select value={sort || 'price-desc'}  // sets price-desc as default, without changing the url
        onChange={handleSort}>
          <option value='price-desc'>Price: Low to High</option>
          <option value='price-asc'>Price: High to Low</option>
          <option value='name-asc'>Name: A to Z</option>
          <option value='name-desc'>Name: Z to A</option>
        </select>
      </div>
      <div className="all-items">
        {processedItems.map(i => <ShopItem item={i} key={i.id} {...cartActions}/>)}
      </div>
    </div>
  )
}