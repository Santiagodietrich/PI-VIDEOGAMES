import{
    GET_ALL_VIDEOGAMES,
    CREATE_VIDEOGAME,
    FILTER_BY_GENRE,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    FILTER_BY_ORIGIN,
} from "./actions";

const initialState={
    allGenres:[],
    allVideogames:[],
}

const reducer=(state=initialState,action)=>{
    switch(action.type){

        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                allVideogames:action.payload,
                allGenres:action.payload
            };

        case FILTER_BY_GENRE:
            const genreToFilter=action.payload;
            if(genreToFilter === ""){
                return{...state,allGenres: state.allVideogames};// Mostrar todos los videojuegos
            }else{
                const filteredByGenre=state.allVideogames.filter((game)=>
                game.genres.includes(filteredByGenre));

                return{...state,allGenres:filteredByGenre};// Filtrar por genero
            }

        case FILTER_BY_ORIGIN:
            const originToFilter=action.payload;
            if(originToFilter === ""){
                return{...state,allGenres:state.allVideogames};
            }else if(originToFilter === "API"){
                const filteredByApi=state.allVideogames.filter((game)=>
                 // Puedes utilizar una regex para identificar el origen de la API por el formato del ID
                // Por ejemplo, si los de la API tienen IDs numéricos y los de la DB tienen UUIDs
                /^-?\d+$/.test(game.id)
                );
                return{...state,allGenres:filteredByApi};// Filtrar por origen API
            }else if(originToFilter === "DB"){
                const filteredByDb=state.allVideogames.filter((game)=>
                 // Utiliza una regex para identificar el origen de la DB por el formato del ID
                 /^-?\d+$/.test(game.id) === false
                 );
                 return{...state,allGenres:filteredByDb};// Filtrar por origen DB
            }

        case ORDER_BY_NAME:
            let sortedGames;
            if(action.payload === "Descendente"){
                sortedGames=[...state.allGenres].sort((a, b)=>b.name.localCompare(a.name));
            }else{
                sortedGames=[...state.allGenres].sort((a, b)=>a.name.localCompare(b.name));
            }

            return{...state,allGenres:sortedGames};

        case ORDER_BY_RATING:
            let gamesOrd;
            if(action.payload === "Ascendente"){
                gamesOrd=[...state.allGenres].sort((a, b)=>a.rating - b.rating);
            }else{
                gamesOrd=[...state.allGenres].sort((a, b)=>b.rating - a.rating);
            }
            
            return{...state,allGenres:gamesOrd};


        case CREATE_VIDEOGAME:
            return{...state}    

        default:
            return{...state}

    }
}

export default reducer;