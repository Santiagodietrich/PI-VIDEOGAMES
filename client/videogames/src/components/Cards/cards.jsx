import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/card";
import Filtered from "../Filtros/filtros";
import styles from "../Cards/cards.module.css";
import { getAllVideogames, getGenres } from "../../redux/actions";


export default function Cards() {
  const [generos, setGeneros] = useState([]);
  const videoJuegos = useSelector((state) => state.allGenres);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  console.log("current", currentPage)

  useEffect(() => {
    dispatch(getAllVideogames(currentPage));
  }, [dispatch, currentPage]);


  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < 7) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
 console.log("VD",videoJuegos);
  return (
    <div>
      <div className={styles.carta}>
        <Filtered generos={generos} setGeneros={setGeneros}></Filtered>
        {videoJuegos.map((element) => (
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
        <button className={styles.botonP} onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className={styles.page}>Page {currentPage}</span>
        <button className={styles.botonN} onClick={handleNextPage} disabled={currentPage === 7}>
          Next
        </button>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../Card/card";
// import Filtered from "../Filtros/filtros";
// import styles from "../Cards/cards.module.css";
// import { getAllVideogames, getGenres } from "../../redux/actions";

// export default function Cards() {
//   const [generos, setGeneros] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const videoJuegos = useSelector((state) => state.allGenres);
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setIsLoading(true);
//     dispatch(getAllVideogames(currentPage))
//       .then(() => setIsLoading(false))
//       .catch((error) => {
//         console.error("Error loading data:", error);
//         setIsLoading(false);
//       });
//   }, [dispatch, currentPage]);

//   useEffect(() => {
//     dispatch(getGenres());
//   }, [dispatch]);

//   const handleNextPage = () => {
//     if (currentPage < 7) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className={styles.loader}>
//       {isLoading ? (
//         <p></p>
//       ) : (
//         <div>
//           <div className={styles.carta}>
//             <Filtered generos={generos} setGeneros={setGeneros}></Filtered>
//             {videoJuegos.map((element) => (
//               <Card
//                 key={element.id}
//                 id={element.id}
//                 name={element.name}
//                 genres={element.genres}
//                 background_image={element.background_image}
//               />
//             ))}
//           </div>
//           <div>
//             <button className={styles.botonP} onClick={handlePrevPage} disabled={currentPage === 1}>
//               Previous
//             </button>
//             <span>Page {currentPage}</span>
//             <button className={styles.botonN} onClick={handleNextPage} disabled={currentPage === 7}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




