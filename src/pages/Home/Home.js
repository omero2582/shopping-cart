import React from "react";
import { Link } from "react-router-dom";
import './Home.scss'
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
export function Home() {
  return(
    <main className="Home">
      <h2 className="hero-text">Welcome to myShop</h2>
      <p className="description">The world's central store for Clothing, Jewlery, and Electronics ! </p>
      <Link to={'/shop'}>Shop Now</Link>
    </main>
  )
}