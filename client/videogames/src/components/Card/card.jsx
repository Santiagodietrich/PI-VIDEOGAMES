import {Link} from 'react-router-dom';


export default function Card ({id,name,background_image,genres}){

    return(
        <div>
            <div>
                <div>
                    <h2>Name:</h2>
                    <Link to={`/detail/${id}`}><h2>{name}</h2></Link>
                    <h2>Genres:</h2>
                    <h2>{genres}</h2>
                </div>
                <img src={background_image} alt={`No se encuentra la imagen de ${name}`} />
            </div>
        </div>
    )

}