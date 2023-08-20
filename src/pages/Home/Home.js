import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
export function Home() {
  return(
    <main className="Home">
      <h1 className="title">Home</h1>
      <p className="description">Check out <Link to="/shop">our Store!</Link></p>
      {/* <LoadingSpinner width={20} sx={{'margin-top': '20px'}}/>
      <LoadingSpinner width={40}/> */}
    </main>
  )
}