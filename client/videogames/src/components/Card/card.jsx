import {Link} from 'react-router-dom';
import styles from './card.module.css'


export default function Card ({id,name,background_image,genres}){
      // Utiliza la función join() para combinar los géneros en una cadena separada por comas
    const genresString = genres.join(', ');
    return(
        <div className={styles.card}>
            <div>
                <div className={styles.cardDetail}>
                    <h2 className={styles.pais}>Name:</h2>
                    <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
                    <h2 className={styles.continente}>Genres:</h2>
                    <h2>{genresString}</h2>
                </div>
                <img className={styles.bandera} src={background_image} alt={`No se encuentra la imagen de ${name}`} />
            </div>
        </div>
    )

}