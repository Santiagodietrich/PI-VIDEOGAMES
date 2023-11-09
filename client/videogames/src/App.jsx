import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Landing from "../src/components/LandingPage/landingPage";
import Form from '../src/components/Form/formPage';
import Detail from '../src/components/Detail/detailPage';
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import NavBar from "../src/components/NavBar/navBar";
import Cards from "../src/components/Cards/cards";
import SearchBar from './components/SearchBar/searchBar';


function App() {

  const [videojuego,setVideojuego]=useState([]);
  console.log("videoG",videojuego)
  const navigate=useNavigate();

  async function onSearch(name,videojuego,setVideojuego){
    try{
      const lowerCaseName=name.toLowerCase();
      console.log("nombre",lowerCaseName)
      const response=await axios.get(`http://localhost:3001/name?name=${lowerCaseName}`);
      console.log("response",response.data)
      if(response.data.length > 0){
        const gameName=response.data[0].name;
        
        const gameExist=videojuego.some((game)=>game.name.toLowerCase() === gameName);
        console.log("gameExist",gameExist)
        if(response.data.id){
          navigate(`/detail/${response.data.id}`);
        }

        if(!gameExist){
          setVideojuego((prevGames)=> [...prevGames,{name:gameName}])
        }
      }else{
        window.alert("El videojuego no existe");
      }

    }catch(error){
      window.alert("Ocurrió un error al buscar el videojuego")
    }
    
  }

  const location=useLocation();


  return (
    <div className="App">
       <SearchBar onSearch={onSearch} videojuego={videojuego} setVideojuego={setVideojuego} />
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

