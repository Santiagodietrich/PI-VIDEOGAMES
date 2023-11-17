import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideogame } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./detailPage.module.css";
import fantasma from "../../assets/fantasmin.png";
import pac from "../../assets/pacmanDetail.png";

export default function VideoGameDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    const detail = useSelector((state) => state.gameId);

    // Normaliza la estructura del género para que todos sean objetos con una propiedad 'name'
    const normalizeGenres = (genres) => {
      // Asegúrate de que genres sea un array antes de mapearlo
      return genres && genres.map((genre) => (typeof genre === 'string' ? { name: genre } : genre));
  };//esta función toma un array de géneros y asegura que cada elemento dentro de ese array
  // sea un objeto con al menos una propiedad llamada 'name'
  
    // Normaliza los géneros
    const normalizedGenres = normalizeGenres(detail.genres);//Almacena el resultado en la variable normalizedGenres.

    console.log("detalle", detail);

    return (
        
        <div className={styles.detailContainer}>
            {detail && (
                <div>
                    <div>
                        <h2>{detail.name}</h2>
                    </div>
                    <div className={styles.detailImageContainer}>
                        <img className={styles.detailImage} src={detail.background_image} alt="No image found" />
                    </div>
                    <div className={`${styles.descripcion} ${styles.detailDescription}`}>
                        <h3>Description</h3>
                        <h5>{detail.description}</h5>
                    </div>
                    <div>
                        <h4>{`Rating:   ${detail.rating}`}</h4>
                    </div>
                    <div>
                        <h4>{`Released date:  ${detail.released}`}</h4>
                    </div>
                    {/* <h4>{`Platforms:  ${detail.platforms}`}</h4> */}
                    <h4>Genres</h4>
                      {normalizedGenres && (
                          <div>
                              {normalizedGenres.map((g, index) => (
                                  <p key={index}>{g.name}</p>
                              ))}
                          </div>
                      )}
                </div>
            )}
        </div>
    );
}

