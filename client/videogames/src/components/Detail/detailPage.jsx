import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getVideogame } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function VideoGameDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    const detail = useSelector((state) => state.gameId);
    
    return (
        <div>
            {detail && ( // Comprobación de si detail tiene datos
                <div>
                    <div>
                        <h2>{detail.name}</h2>
                    </div>
                    <img src={detail.background_image} alt="No image found" width='250px' height='300px' />
                    <h3>Description</h3>
                    <h5>{detail.description}</h5>
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


  


