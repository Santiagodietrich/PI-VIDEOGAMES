import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import controles from "../../assets/controles.png";

export default function LandingPage (){
    return(
        <div className={styles.landing}>
            {/* <h1 className={styles.titulo}>PI-VIDEOGAMES</h1>
            <h2 className={styles.nombre}>BY:Santiago Dietrich</h2> */}
            <img className={styles.controles} src={controles} alt="controles" />
            <Link to={'/home'}>
                <button>Start</button>
            </Link>
        </div>
    )
}