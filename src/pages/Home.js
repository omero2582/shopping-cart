import React from "react";
import { Link } from "react-router-dom";
import './styles/Home.css'
export function Home() {
  return(
    <main className="Home">
      <h1>Home</h1>
      <p>Check out <Link to="/shop">our Store!</Link></p>
    </main>
  )
}