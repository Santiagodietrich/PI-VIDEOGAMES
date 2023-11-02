import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';


export default function Detail (){
    const {id}=useParams();
    const{games,setGames}=useState({});

    useEffect(()=>{
        axios(`https://api.rawg.io/api/games/${id}?key=574a2e1d874a498db48bf6179e7cbd2a`)
        .then(({data})=>{
            if(data.name){
                setGames(data);
            }else{
                window.alert("No hay videojuegos con ese ID");
            }
        });
        return setGames({});
    },[id]);

    return(
        <div>
            {games.name &&(
                <div>
                    <h2>{games.name}</h2>
                    <p><b>Genres:</b> {games.genres}</p>
                    <img src={games.background_image} alt='Image not found' />
                </div>
            )}
        </div>
    )
}

