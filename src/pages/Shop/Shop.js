import React, { useMemo, useState } from "react";
import ShopItem from './ShopItem'
import './Shop.css';
import { useSearchParams } from "react-router-dom";
import useShop from "../../context/shopContext/useShop";
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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

  const toggleDescription = (e) => {
    setShowDescription(e.target.checked);
  };

  return(
    <main className="Shop">
      <h1 className="visually-hidden">Shop</h1>
      <Sidebar setSearchParams={setSearchParams}/>
      <Options
        sort={sort}
        handleSort={handleSort}
        showDescription={showDescription}
        toggleDescription={toggleDescription}
      />
      <AllItems
        error={error}
        isLoading={isLoading}
        items={processedItems}
        showDescription={showDescription}
      />
    </main>
  )
}

function Sidebar({setSearchParams}) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <section className={`Sidebar ${!showSidebar && 'hidden'}`}>
      <button className="toggle-sidebar" onClick={() => setShowSidebar(s => !s)}>
        {/* ☰ */}
        <Icon path={mdiMenu} size={1.25} />
      </button>
      { showSidebar &&
      <>
        <h3 className="title">Categories</h3>
        <ul>
          <li onClick={() => setSearchParams({})}>All</li>
          <li onClick={() => setSearchParams({category: "men's clothing"})}>Men's Clothing</li>
          <li onClick={() => setSearchParams({category: "women's clothing"})}>Women's Clothing</li>
          <li onClick={() => setSearchParams({category: 'electronics'})}>Electronics</li>
          <li onClick={() => setSearchParams({category: 'jewelery'})}>Jewelery</li>
          {/* Clears all other search params. Intended */}
        </ul>
      </>
      }
    </section>
  )
}

function Options({ sort, handleSort , showDescription, toggleDescription }){
  return (
    <section className="Options">
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
          onChange={toggleDescription}></input>
        <label htmlFor="toggle-description">Descriptions</label>
      </section>
    </section>
  )
}

function AllItems({ error, isLoading, items, showDescription }) {

  if (error) return (
    <section className={'error'}>
      <h2>ERROR loading shop items</h2>
    </section>
  )
  if (isLoading) return (
    <LoadingSpinner showText sx={{'margin-top': '20px'}}/>
  )
  
  return (
    <section className={`AllItems ${showDescription ? 'show-description' : ''}`}>
      <h2 className="visually-hidden">All Items</h2>
      {items.map(i => 
        <ShopItem item={i} key={i.id} showDescription={showDescription}/>)}
    </section>
  )
}