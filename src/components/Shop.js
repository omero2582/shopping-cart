import React, { useEffect, useState, useMemo } from "react";
import requestItem from "./requestItem";
import Item from './Item'
import './Shop.css';
import { useSearchParams } from "react-router-dom";

const sortProducts = (products, sort) => {
  console.log(`sort ${sort}`);
  switch(sort) {
    case 'name-asc':
      return [...products].sort((a, b) =>  a.name.localeCompare(b.name));
    case 'name-desc':
      return [...products].sort((a, b) =>  b.name.localeCompare(a.name));
    case 'price-asc':
      return [...products].sort((a, b) =>  b.priceTotal - a.priceTotal);
    case 'price-desc':
    default:
      return [...products].sort((a, b) =>  a.priceTotal - b.priceTotal);
  }
}

const filterProducts = (products, filter) => {
  console.log(`filter ${filter}`);
  if(!filter) return [...products];
  if(filter === 'ad'){
    return products.filter(p => p.categories.includes('Damage'));
  }else if(filter ==='ap'){
    return products.filter(p => p.categories.includes('SpellDamage'));
  }else {
    return [...products];
  }
};

export function Shop() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const filter = searchParams.get('category');
  const sort = searchParams.get('sort');
  let processedProducts = products;

  useEffect(() => {
    const fetchData = async () => {
      const itemData = await requestItem.processAllData();
      const trueItems = itemData.filter(i => i.inStore === true && i.requiredChampion === '');
      // removes a lot of effects coded as items
      // and champ-specifc items like kalista blackspear or fiddle trinket
      // if we want, we can further remove trinkets with && !(i.categories.includes('Trinket'))
      setProducts(trueItems);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filter);
  }, [products, filter]);
  
  processedProducts = useMemo( () => {
    return sortProducts(filteredProducts, sort);
  }, [filteredProducts, sort]);

  const handleSelect = (e) => {
    setSearchParams({...Object.fromEntries(searchParams.entries()), sort: e.target.value})
  };

  return(
    <div className="shop">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSearchParams({})}>All</li>
          <li onClick={() => setSearchParams({category: 'ad'})}>AD</li>
          <li onClick={() => setSearchParams({category: 'ap'})}>AP</li>
        </ul>
      </div>
      <div className="sort">
        <select value={sort || 'price-desc'}  // sets price-desc as default, without changing the url
        onChange={handleSelect}>
          <option value='price-desc'>Price: Low to High</option>
          <option value='price-asc'>Price: High to Low</option>
          <option value='name-asc'>Name: A to Z</option>
          <option value='name-desc'>Name: Z to A</option>
        </select>
      </div>
      <div className="all-products">
        {processedProducts.map(p => <Item {...p} key={p.id}/>)}
      </div>
    </div>
  )
}