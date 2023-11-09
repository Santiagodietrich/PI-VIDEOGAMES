// import React,{useState,useEffect} from "react";
// import { useDispatch,useSelector } from "react-redux";
// import axios from "axios";
// import Card from "../Card/card";
// import { getAllVideogames, getGenres } from "../../redux/actions";
// import Filtered from "../Filtros/filtros";
// import styles from "../Cards/cards.module.css"


// export default function Cards(){

//     const[date,setDate]=useState([]);
//     const[generos,setGeneros]=useState([]);
//     const videoJuegos=useSelector((state)=>state.allGenres)

//     const[currentPage,setCurrentPage]=useState(1);
//     const dispatch=useDispatch();

//     useEffect(()=>{
//         dispatch(getAllVideogames()),
//         dispatch(getGenres())
//     },[dispatch])

//     const handleNextPage=()=>{
//         setCurrentPage(currentPage + 1);
//     };

//     const handlePrevPage=()=>{
//         if(currentPage > 1){
//             setCurrentPage(currentPage - 1);
//         }
//     };


//     const handleOrderAsc= async()=>{
//         try{
//             await dispatch(orderAsc());
//         }catch(error){
//         console.error(error)
//         }
//     }

//     const handleOrderDesc=async()=>{
//         try{
//             await dispatch(orderDesc())
//         }catch(error){
//             console.error(error)
//         }
//     }

//     return(
//         <div>
//             <div className={styles.carta}>
//                <Filtered generos={generos} setGeneros={setGeneros}></Filtered> 
//                {videoJuegos.map((element)=>(
//                 <Card
//                     key={element.id}
//                     id={element.id}
//                     name={element.name}
//                     genres={element.genres}
//                     background_image={element.background_image}
//                 />
//                ))}
//             </div>
//             <div>
//                 <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
//                 <button onClick={handleNextPage}>Next</button>
//             </div>
//         </div>
//     );


// }



// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Card from "../Card/card";
// import Filtered from "../Filtros/filtros";
// import styles from "../Cards/cards.module.css";
// import { getAllVideogames,getGenres } from "../../redux/actions";

// export default function Cards() {
//   const [date, setDate] = useState([]);
//   const [generos, setGeneros] = useState([]);
//   const videoJuegos = useSelector((state) => state.allGenres);
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);
//   const gamesPerPage = 15;

//   useEffect(() => {
//     dispatch(getAllVideogames());
//     dispatch(getGenres());
//   }, [dispatch]);

//   const handleNextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Filtra los videojuegos para mostrar solo los de la página actual
//   const gamesToDisplay = videoJuegos.slice(
//     (currentPage - 1) * gamesPerPage,
//     currentPage * gamesPerPage
//   );

//   return (
//     <div>
//       <div className={styles.carta}>
//         <Filtered generos={generos} setGeneros={setGeneros}></Filtered>
//         {gamesToDisplay.map((element) => (
//           <Card
//             key={element.id}
//             id={element.id}
//             name={element.name}
//             genres={element.genres}
//             background_image={element.background_image}
//           />
//         ))}
//       </div>
//       <div>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <button onClick={handleNextPage} disabled={currentPage * gamesPerPage >= 100}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "../Card/card";
import Filtered from "../Filtros/filtros";
import styles from "../Cards/cards.module.css";
import { getAllVideogames, getGenres } from "../../redux/actions";


export default function Cards() {
  const [date, setDate] = useState([]);
  const [generos, setGeneros] = useState([]);
  const videoJuegos = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;
  const totalPages=Math.ceil(videoJuegos.length/gamesPerPage)

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage * gamesPerPage < videoJuegos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filtra los videojuegos para mostrar solo los de la página actual
  // const gamesToDisplay = videoJuegos.slice(
  //   (currentPage - 1) * gamesPerPage,
  //   currentPage * gamesPerPage
  // );

  const getCurrentVideogames=()=>{
    const startIndex=(currentPage - 1) * gamesPerPage
    const endIndex=startIndex+gamesPerPage
    return videoJuegos.slice(startIndex,endIndex)
  }

  // Genera un array de números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div className={styles.carta}>
        <Filtered generos={generos} setGeneros={setGeneros}></Filtered>
        {getCurrentVideogames().map((element) => (
          <Card
            key={element.id}
            id={element.id}
            name={element.name}
            genres={element.genres}
            background_image={element.background_image}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        {/* <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button> */}
        <ul className={styles.pageNumbers}>
          {pageNumbers.map((pageNumber) => (
            <li
              key={pageNumber}
              className={pageNumber === currentPage ? styles.activePage : ""}
            >
              <button onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>
            </li>
          ))}
        </ul>
        {/* <button onClick={handleNextPage} disabled={currentPage * gamesPerPage >= videoJuegos.length}>
          Next
        </button> */}
      </div>
    </div>
  );
}

