import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenre,filterOrigin,orderByName,orderByRating } from "../../redux/actions";
import styles from "./filtros.module.css"


export default function Filtered({generos,setGeneros}){
    const dispatch = useDispatch();
    const Vgame = useSelector((state) => state.allGenres); // Usar los videojuegos filtrados
  
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');


    useEffect(()=>{
        if(generos && generos.length > 0){
        setGeneros(generos)
        console.log("genero",generos)
        }
    },[generos]);


    const handleGenreChange=async(genres)=>{
        setSelectedGenre(genres);
        try{
            await dispatch(filterByGenre(genres));
        }catch(error){
            console.error(error);
        }
    };


    const handleOriginChange=async(payload)=>{
        setSelectedOrigin(payload);
        try{
            await dispatch(filterOrigin(payload));
        }catch(error){
            console.error(error)
        }
    };


    const handleOrderName=async(event)=>{
        dispatch(orderByName(event.target.value));
    };


    const handleOrderRating=async(event)=>{
        dispatch(orderByRating(event.target.value));
    };


    return(
        <div className={styles.filtro}>
            <div>
                <label>Filtrar por Genero:</label>
                <select value={selectedGenre} onChange={(e)=> handleGenreChange(e.target.value)}>
                    <option value="">Todos</option>
                    {generos.map((genres)=>(
                        <option key={genres} value={genres}>
                            {genres}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Filtrar por Origen</label>
                <select value={selectedOrigin} onChange={(e)=> handleOriginChange(e.target.value)}>
                <option value="">Todos</option>
                <option value="API">API</option>
                <option value="DB">Base de Datos</option> 
                </select>
            </div>

            <div>
                <label>Orden Alfabetico</label>
                <select onChange={event=> handleOrderName(event)}>
                <option value="Ascendente">A-Z</option>
                <option value="Descendente">Z-A</option>
                </select>
            </div>
            <div>
                <label>Orden Rating</label>
                <select onChange={event=> handleOrderRating(event)}>
                <option value="Ascendente">A-Z</option>
                <option value="Descendente">Z-A</option>
                </select>
            </div>

        </div>
    )


    
}