import axios from "axios";
export const GET_ALL_VIDEOGAMES="GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
// export const GET_NAME_VIDEOGAMES = "GET_NAME_VIDEOGAMES";
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
    return async function(dispatch){
        const videogame=await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type:"GET_VIDEOGAME",
            payload:videogame.data
        })
    }
}

// export function getNameVideogames(name){
//     return async function (dispatch){
//         try{
//             let allVg=await axios.get( `http://localhost:3001/videogames?name=${name}`);
//         }catch(error){
//             if(error.response.status === 404){
//                 allVg={data:"Not found"}
//             }
//         }
//         return dispatch({
//             type:GET_NAME_VIDEOGAMES,
//             payload:allVg.data
//         });
//     }
// }

export function createVideoGame(data){

    return async function (dispatch){
        await axios.post("http://localhost:3001/create",data);
        return dispatch({
            type:CREATE_VIDEOGAME,
        })
    }
}

export function getGenres(){
    return async function (dispatch){
        let allGenres=axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type:GET_GENRES,
            payload:allGenres.data
        });
    }
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

