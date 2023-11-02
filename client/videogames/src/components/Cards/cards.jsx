import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import Card from "../Card/card";
import { getAllVideogames, getGenres } from "../../redux/actions";
import Filtered from "../Filtros/filtros";
import styles from "../Cards/cards.module.css"


export default function Cards(){

    const[date,setDate]=useState([]);
    const[generos,setGeneros]=useState([]);
    const videoJuegos=useSelector((state)=>state.allGenres)

    const[currentPage,setCurrentPage]=useState(1);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getAllVideogames()),
        dispatch(getGenres())
    },[dispatch])

    const handleNextPage=()=>{
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage=()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    };


    const handleOrderAsc= async()=>{
        try{
            await dispatch(orderAsc());
        }catch(error){
        console.error(error)
        }
    }

    const handleOrderDesc=async()=>{
        try{
            await dispatch(orderDesc())
        }catch(error){
            console.error(error)
        }
    }

    return(
        <div>
            <div className={styles.carta}>
               <Filtered generos={generos} setGeneros={setGeneros}></Filtered> 
               {videoJuegos.map((element)=>(
                <Card
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    genres={element.genres}
                    background_image={element.background_image}
                />
               ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );


}