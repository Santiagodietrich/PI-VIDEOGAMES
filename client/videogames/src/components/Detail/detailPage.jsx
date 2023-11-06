// import { useParams } from 'react-router-dom';
// import { useState,useEffect } from 'react';
// import { getVideogame } from '../../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';




// export default function Detail (){
//     const {id}=useParams();
//     const [games,setGames]=useState({});
//     const dispatch=useDispatch();
//     const detail=useSelector((state)=> state.gameId)

//     console.log("detail",detail)
//     useEffect(()=>{
//         dispatch(getVideogame())
//     },[dispatch,id])

    


//     return(
//         <div>
//                 <div>
//                     <h2>{detail.name}</h2>
//                     <p><b>Genres:</b> {detail.genres}</p>
//                     <img src={detail.background_image} alt='Image not found' />
//                 </div>
            
//         </div>
//     )
// }


// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { getVideogame } from '../../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';

// export default function Detail() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         dispatch(getVideogame(id));
//     }, [dispatch, id]);

//     const detail = useSelector((state) => state.gameId);

//     console.log("deeetail",detail)
//     return (
//         <div>
//             {detail && (
//                 <div>
//                     <h2>{detail.name}</h2>
//                     <p><b>Genres:</b> {detail.genres}</p>
//                     <img src={detail.background_image} alt='Image not found' />
//                 </div>
//             )}
//         </div>
//     );
// }



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'; // Importa useParams
// import { getVideogame } from '../../redux/actions';

// export default function VideoGameDetails() {
//     const { id } = useParams(); // Obtiene el parámetro id de la URL
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getVideogame(id)); // Pasa el id a la acción
//     }, [dispatch, id]);

//     const detail = useSelector((state) => state.gameId);
//     console.log("det",detail)
//     return (
//         <div>
//             <div>
//                 <div>
//                     <h2>{detail.name} details</h2>
//                 </div>
//                 <img src={detail.background_image} alt="No image found" width='250px' height='300px' />
//                 <h3>Description</h3>
//                 <h5>{detail.description}</h5>
//                 <div>
//                     <h4>{`Rating:   ${detail.rating}`}</h4>
//                 </div>
//                 <div>
//                     <h4>{`Released date:  ${detail.released}`}</h4>
//                 </div>
//                 <h4>{`Platforms:  ${detail.platforms}`}</h4>
//                 <h4>{`Genres: ${detail.genres}`}</h4>
//             </div>
//         </div>
//     );
// }



// export default function VideoGameDetails() {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getVideogame(id));
//     }, [dispatch, id]);

//     const detail = useSelector((state) => state.gameId);
//     console.log("det", detail);

//     return (
//         <div>
//             {Object.keys(detail).length > 0 && ( // Comprobación de si detail tiene datos
//                 <div>
//                     <div>
//                         <h2>{detail.name} details</h2>
//                     </div>
//                     <img src={detail.background_image} alt="No image found" width='250px' height='300px' />
//                     <h3>Description</h3>
//                     <h5>{detail.description}</h5>
//                     <div>
//                         <h4>{`Rating:   ${detail.rating}`}</h4>
//                     </div>
//                     <div>
//                         <h4>{`Released date:  ${detail.released}`}</h4>
//                     </div>
//                     <h4>{`Platforms:  ${detail.platforms}`}</h4>
//                     <h4>{`Genres: ${detail.genres}`}</h4>
//                 </div>
//             )}
//         </div>
//     );
// }


////////////////////////////FORMAS QUE HIZO EL PIBE DE WSP//////////////////////////////////////////////////////

// import React, { useEffect } from "react";
// import {  useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
//  import { getVideogame } from '../../redux/actions';
// // import NotFound from "../../components/notFound/notFound";
// import style from "./detailPage.module.css";

// function Detail() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const videogame = useSelector((state) => state.gameId);

//     useEffect(() => {
//         dispatch(getVideogame(id));
//     }, [dispatch, id]);

//     return (
//         <div className={style.card}>
            
//             <div >
                        
//                     <p><strong>Id:</strong>  {videogame.id}</p>
//                     <p><strong>Nombre:</strong> {videogame.name}</p>      
                                  
//                     <p>{videogame.hasOwnProperty("background_image") ?
//                         (<img src={videogame.background_image} className={style.img} alt="not found" />) :
//                         (<img src={videogame.image} className={style.img} alt="not found" />)}</p>
                       

//                         <div >
//                     <p><strong> Plataforma:</strong> {Array.isArray(videogame.platforms) ? (
//                             videogame.platforms.map(p => p.platform.name).join(", ")
//                         ) : (
//                             (videogame.platforms)
//                         )}</p>
//                     <p> <strong>Fecha De Lanzamiento:</strong>{videogame.released}</p>
//                     <p><strong>Rating:</strong> {videogame.rating}</p>
//                 <p><strong>Genres:</strong>   {Array.isArray(videogame.genres) ? (
//                     videogame.genres.map(genre => genre.name).join(", ")
//                 ) : (
//                     "Genres data is not available"
//                 )}</p>       
//                     <p ><strong>Descripción:</strong></p> {videogame.description  }
                 
                  
//                 </div>
                
//             </div>



//         </div>
//     )
// }

// export default Detail;



import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from '../../redux/actions';
import style from "./detailPage.module.css";

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.gameId);

    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    // Comprueba si los datos están disponibles antes de renderizar
    if (!videogame || Object.keys(videogame).length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div className={style.card}>
            <div>
                <p><strong>Id:</strong>  {videogame.id}</p>
                <p><strong>Nombre:</strong> {videogame.name}</p>      
                <p>{videogame.hasOwnProperty("background_image") ?
                    (<img src={videogame.background_image} className={style.img} alt="not found" />) :
                    (<img src={videogame.image} className={style.img} alt="not found" />)}</p>
                <div>
                    <p><strong> Plataforma:</strong> {Array.isArray(videogame.platforms) ? (
                        videogame.platforms.map(p => p.platform.name).join(", ")
                    ) : (
                        (videogame.platforms)
                    )}</p>
                    <p> <strong>Fecha De Lanzamiento:</strong>{videogame.released}</p>
                    <p><strong>Rating:</strong> {videogame.rating}</p>
                    <p><strong>Genres:</strong>   {Array.isArray(videogame.genres) ? (
                        videogame.genres.map(genre => genre.name).join(", ")
                    ) : (
                        "Genres data is not available"
                    )}</p>       
                    <p ><strong>Descripción:</strong></p> {videogame.description}
                </div>
            </div>
        </div>
    );
}

export default Detail

