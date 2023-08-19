import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
export function Home() {
  return(
    <main className="Home">
      <h1 className="title">Home</h1>
      <p className="description">Check out <Link to="/shop">our Store!</Link></p>
    </main>
  )
}