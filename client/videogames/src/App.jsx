import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Landing from "../src/components/LandingPage/landingPage";
import Form from '../src/components/Form/formPage';
import Detail from '../src/components/Detail/detailPage';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import NavBar from "../src/components/NavBar/navBar";
import Cards from "../src/components/Cards/cards";


function App() {

  const {videojuego,setVideojuego}=useState();

  const navigate=useNavigate();

//   async function onSearch(name){
//     try{
//       const lowerCaseName=name.toLowerCase();
//       console.log("nombre",lowerCaseName)
//       const response=await axios.get(`http://localhost:3001/videogames?name=${lowerCaseName}`);
// // https://api.rawg.io/api/games?search=${lowerCaseName}&key=574a2e1d874a498db48bf6179e7cbd2a`

//       console.log("response",response)
//       if(response.data && response.data.length > 0){
//         const gameName=response.data[0].name;
//         const gameExist=videojuego.some((game)=>game.name.toLowerCase() === gameName);
//         console.log("gameExist",gameExist)
//         if(response.data.id){
//           navigate(`/detail/${response.data.id}`);
//         }

//         if(!gameExist){
//           setVideojuego((prevGames)=> [...prevGames,{name:gameName}])
//         }
//       }else{
//         window.alert("El videojuego no existe");
//       }

//     }catch(error){
//       window.alert("Ocurrió un error al buscar el videojuego")
//     }
    
//   }

// async function onSearch(name) {
//   try {
//     const lowerCaseName = name.toLowerCase(); // Convertir a minúsculas
//     console.log("nombre", lowerCaseName);
//     const response = await axios.get(`http://localhost:3001/videogames?name=${lowerCaseName}`);

//     console.log("response", response);

//     if (response.data && response.data.length > 0) {
//       // La respuesta es una matriz, así que vamos a comprobar si el juego existe en la lista
//       const gameExists = response.data.some((game) => game.name.toLowerCase() === lowerCaseName);
//       if (gameExists) {
//         // Realiza las acciones que necesites
//       } else {
//         window.alert("El videojuego no existe");
//       }
//     } else {
//       window.alert("El videojuego no existe");
//     }
//   } catch (error) {
//     window.alert("Ocurrió un error al buscar el videojuego");
//   }
// }

async function onSearch(name){
  try{
    const lowerCaseName=name.toLowerCase();
    const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    if(response.data.length > 0){
      // const videogame=response.data.name.toLowerCase()
      // console.log("videogame",videogame)
      console.log("response",response)
      const gameExist=response.data.some((g)=> g.name.toLowerCase() === lowerCaseName)
      if (gameExist) {
        const gameName = gameExist.name;
        console.log("Exist", gameName);
      }
      console.log("exist",gameExist)
    }

  }catch(error){
    window.alert("Ocurrió un error al buscar el videojuego");
  }
}


  const location=useLocation();


  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar onSearch={onSearch}/>}
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='detail/:id' element={<Detail/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/home' element={<Cards videojuego={videojuego}/>}></Route>

      </Routes>
    </div>
  );
}

export default App;

