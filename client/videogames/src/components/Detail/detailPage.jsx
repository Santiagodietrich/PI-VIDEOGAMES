import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideogame } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./detailPage.module.css";

export default function VideoGameDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    const detail = useSelector((state) => state.gameId);
    
    return (
        <div className={styles.container}>
            {detail && ( // Comprobación de si detail tiene datos
                <div className={styles.box}>
                    <div>
                        <h2>{detail.name}</h2>
                    </div>
                    <div className={styles.imagen}>
                    <img src={detail.background_image} alt="No image found" width='250px' height='300px' />
                    </div>
                    <div className={styles.descripcion}>
                    <h3>Description</h3>
                    <h5>{detail.description}</h5>
                    </div>
                    <div>
                        <h4>{`Rating:   ${detail.rating}`}</h4>
                    </div>
                    <div>
                        <h4>{`Released date:  ${detail.released}`}</h4>
                    </div>
                    <h4>{`Platforms:  ${detail.platforms}`}</h4>
                    <h4>{`Genres: ${detail.genres}`}</h4>
                </div>
            )}
        </div>
    );
}


  


