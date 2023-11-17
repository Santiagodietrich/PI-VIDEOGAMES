
import { Link } from 'react-router-dom';
import styles from './card.module.css';

export default function Card({ id, name, background_image, genres }) {
  // Utiliza la prop genres directamente
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cardDetail}>
          <h2 className={styles.pais}></h2>
        </div>
        <img className={styles.bandera} src={background_image} alt={`No se encuentra la imagen de ${name}`} />
        <div className={styles.cardDetail}>
          <Link to={`/detail/${id}`}>
            <h2>{name}</h2>
          </Link>
          <h2 className={styles.continente}></h2>
          <h2>{genres.map((genre) => genre.name).join(', ')}</h2> {/* Utiliza la prop genres directamente */}
        </div>
      </div>
    </div>
  );
}
