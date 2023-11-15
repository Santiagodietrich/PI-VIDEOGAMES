
// const { Videogame, Genre } = require("../db");
// const axios = require("axios");
// const { Op } = require("sequelize");

// const videogamesByName = async (req, res) => {
//     const { name } = req.query;
//     try {

//         const gameDb=await Videogame.findOne({
//             where:{
//                 name:{
//                     [Op.iLike]:`%${name}%`
//                 }
//             }
//         })

//         if(gameDb){
//             return res.status(200).json(gameDb)
//         }else{
//             const response = await axios.get(`https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&search=${name}&page_size=15`);
//             const gameData = response.data.results;

//             if (gameData.length > 0) {
//                 const mappedGames = gameData.map((game) => {
//                     const platforms = game.platforms.map((e) => e.platform.name);
//                     const genres = game.genres.map((g) => g.name);

//                         return {
//                             id: game.id,
//                             name: game.name,
//                             description: game.description,
//                             released: game.released,
//                             rating: game.rating,
//                             platforms: platforms,
//                             genres: genres,
//                             background_image: game.background_image,
//                         };
//                 });

//                 res.json(mappedGames);
//             } else {
//                 res.status(404).json({ message: "No se encontraron videojuegos" });
//             }
//         }

       
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error en la búsqueda de videojuegos" });
//     }
// };

// module.exports = videogamesByName;


// const videogamesByName=async(name)=>{

//     const nameOfVideogameBDD= await Videogame.findAll({
//         where:{name:{[Op.iLike]:`%${name}%`} },
//         limit:15,
//     });

//     try{
//         const {data}=await axios.get(`https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&search=${name}&page_size=15`);

//         let namesOfVideogamesAPI=data.results.map((j)=>{
//             return{
//                 id:j.id,
//                 name:j.name,
//                 description:j.description,
//                 platforms:j.platforms.map((pl)=> pl.platforms.name),
//                 background_image:j.background_image,
//                 released:j.released,
//                 rating:j.rating,
//                 genres:j.genres.map((g)=>g.name),
//             };
//         });
//         console.log("Games from API",namesOfVideogamesAPI)
//         if(!namesOfVideogamesAPI && !nameOfVideogameBDD){
//             throw error("No existe el videojuego");
//         }else{
//             return[...namesOfVideogamesAPI,...nameOfVideogameBDD];
//         }

//     }catch(error){
//         console.error("Error fetching data from the API:",error);
//         return {error:"Failed to fetch data from the API"};
//     }

// }

// module.exports=videogamesByName;



const axios = require("axios");
const { Videogame, Genre } = require("../db");
// const { Op } = require("sequelize");

const videogamesByName = async (req, res) => {
  try {
    const videogameDb = async () => {
      return await Videogame.findAll({
        include: Genre,
      });
    };

    const videogameAPI = async () => {
        const { name } = req.query;
        
      const responseUno = await axios.get(
        `https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&search=${name}&page_size=15`
      );
      const receivedData = responseUno.data;

      if (receivedData && receivedData.results) {
        const mapeo = receivedData.results.map((m) => {
          const platforms = m.platforms.map((e) => e.platform.name);
          const genres = m.genres.map((e) => e.name);

          return {
            id: m.id,
            name: m.name,
            released: m.released,
            background_image: m.background_image,
            rating: m.rating,
            platforms: platforms,
            description: m.description,
            genres: genres,
          };
        });
        return mapeo;
      } else {
        throw new Error("Datos de la API no son válidos");
      }
    };

    // Llama a la función para obtener todos los juegos y espera a que se complete antes de continuar
    const dbInfo = await videogameDb();

    const apiData = await videogameAPI();
    const total = apiData.concat(dbInfo);

    // Envía la respuesta al cliente
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = videogamesByName;
