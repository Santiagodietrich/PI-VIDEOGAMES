import axios from "axios";
export const GET_ALL_VIDEOGAMES="GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_NAME_VIDEOGAMES = "GET_NAME_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const CREATE_VIDEOGAME="CREATE_VIDEOGAME";
export const FILTER_BY_GENRE="FILTER_BY_GENRE";
export const ORDER_BY_NAME="ORDER_BY_NAME";
export const ORDER_BY_RATING="ORDER_BY_RATING";
export const FILTER_BY_ORIGIN="FILTER_BY_ORIGIN";
export const ORDER_ASC="ORDER_ASC";
export const ORDER_DESC="ORDER_DESC";


export function getAllVideogames(){
    return async function (dispatch){
        let allVideogames=await axios.get(`http://localhost:3001/videogames`);
        return dispatch({
            type:"GET_ALL_VIDEOGAMES",
            payload:allVideogames.data
        });
    };
}


export function getVideogame(id){
    try{
    return async function(dispatch){
        const json=await axios.get(`http://localhost:3001/videogames-${id}`);
        return dispatch({
            type:"GET_VIDEOGAME",
            payload:json.data
        })
    }
    }catch(error){
        console.error("error al cargar los datos")
    }
}

export function getNameVideogames(name){
    return async function (dispatch){
        let allVg=await axios.get( `http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type:GET_NAME_VIDEOGAMES,
            payload:allVg.data
        });
    }
}

export function createVideoGame(data){

    return async function (dispatch){
        await axios.post("http://localhost:3001/create",data);
        return dispatch({
            type:CREATE_VIDEOGAME,
        })
    }
}

// export function getGenres(){
//     try{
//         return async function (dispatch){
//             let allGenres=axios.get(`http://localhost:3001/genres`);
//             console.log("allGenres",allGenres)
//             return dispatch({
//                 type:GET_GENRES,
//                 payload:allGenres.data
//             });
//         }
//     }catch(error){
//         console.error(error)
//     }
// }


export function getGenres() {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/genres?key=574a2e1d874a498db48bf6179e7cbd2a`);
        const allGenres = response.data;
        console.log("allGenres", allGenres);
  
        dispatch({
          type: GET_GENRES,
          payload: allGenres,
        });
      } catch (error) {
        console.error(error);
      }
    };
  }
  

export function filterByGenre(payload){
    return{
        type:FILTER_BY_GENRE,
        payload,
    }
}

export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload,
    };
}

export function orderByRating(payload){
    return{
        type:ORDER_BY_RATING,
        payload,
    };
}

export function filterOrigin (payload){
    return { type: FILTER_BY_ORIGIN, payload };
  };

