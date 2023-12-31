import './App.css';
import Landing from "../src/components/LandingPage/landingPage";
import Form from '../src/components/Form/formPage';
import Detail from '../src/components/Detail/detailPage';
import {Routes,Route,useLocation} from "react-router-dom";
import NavBar from "../src/components/NavBar/navBar";
import Cards from "../src/components/Cards/cards";

function App() {

  const location=useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar  />}
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='detail/:id' element={<Detail/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/home' element={<Cards/>}></Route>
      </Routes>
    </div>
  );
}


export default App;




