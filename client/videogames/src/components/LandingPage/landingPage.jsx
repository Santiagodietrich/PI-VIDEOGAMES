import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage (){
    return(
        <div>
            <h1>PI-VIDEOGAMES</h1>
            <h2>BY:Santiago Dietrich</h2>
            <Link to={'/home'}>
                <button>Start</button>
            </Link>
        </div>
    )
}