import React, { useMemo, useState } from "react";
import ShopItem from './ShopItem'
import './Shop.css';
import { useSearchParams } from "react-router-dom";
import useShop from "../../context/shopContext/useShop";

const sortItems = (items, sort) => {
  console.log(`sort ${sort}`);
  switch(sort) {
    case 'name-asc':
      return [...items].sort((a, b) =>  a.title.localeCompare(b.title));
    case 'name-desc':
      return [...items].sort((a, b) =>  b.title.localeCompare(a.title));
    case 'price-desc':
      return [...items].sort((a, b) =>  b.price - a.price);
    case 'price-asc':
    default:
      return [...items].sort((a, b) =>  a.price - b.price);
  }
}

const filterItems = (items, filter) => {
  console.log(`filter ${filter}`);
  if (!filter) return items;
  return items.filter(p => p.category === filter);
};

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const filter = searchParams.get('category') ;
  const sort = searchParams.get('sort') || 'price-asc';
  const [showDescription, setShowDescription] = useState(false) 
  // fetch shop
  const { items, error, isLoading } = useShop();

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

  const handleToggleDescription = (e) => {
    setShowDescription(e.target.checked);
  };

  return(
    <main className="Shop">
      <h1 className="visually-hidden">Shop</h1>
      <section className="filter">
        <h3 className="title">Categories</h3>
        <ul>
          <li onClick={() => setSearchParams({})}>All</li>
          <li onClick={() => setSearchParams({category: "men's clothing"})}>Men's Clothing</li>
          <li onClick={() => setSearchParams({category: "women's clothing"})}>Women's Clothing</li>
          <li onClick={() => setSearchParams({category: 'electronics'})}>Electronics</li>
          <li onClick={() => setSearchParams({category: 'jewelery'})}>Jewelery</li>
          {/* Clears all other search params. Intended */}
        </ul>
      </section>
      <section className="options">
        <section className="sort">
          <label htmlFor="sort-options" className="sort-title">Sort</label>
          <select id="sort-options" value={sort || 'price-asc'}  // sets price-asc as default, without changing the url
          onChange={handleSort}>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='name-asc'>Name: A to Z</option>
            <option value='name-desc'>Name: Z to A</option>
          </select>
        </section>
        <section className="toggle-description">
          <input 
            type="checkbox"
            id="toggle-description"
            checked={showDescription}
            onChange={handleToggleDescription}></input>
          <label htmlFor="toggle-description">Descriptions</label>
        </section>
      </section>
      <section className={`all-items ${showDescription ? 'show-description' : ''}`}>
        {error ? <h2 className="error">ERROR loading shop items</h2>
        : isLoading ? <h2>Loading...</h2>
        :
          <>
            <h2 className="visually-hidden">All Items</h2>
            {processedItems.map(i => 
              <ShopItem item={i} key={i.id} showDescription={showDescription}/>)}
          </>}
        
      </section>
    </main>
  )
}