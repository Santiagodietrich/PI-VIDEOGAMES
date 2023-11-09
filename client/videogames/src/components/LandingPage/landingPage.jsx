import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import controles from "../../assets/controles.png";
import start from "../../assets/start.png"


export default function LandingPage (){
    return(
        <div className={styles.landing}>
            <h1 className={styles.titulo}>PI HENRY-VIDEOGAMES</h1>
            {/* <h2 className={styles.nombre}>BY:Santiago Dietrich</h2> */}
            <img className={styles.controles} src={controles} alt="controles" />
            <img className={styles.start} src={start} alt="start" />
            <Link to={'/home'}>
                <button className={styles.boton}></button>
            </Link>
        </div>
    )
}