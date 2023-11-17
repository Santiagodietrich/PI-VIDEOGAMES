// const axios = require("axios");
// const gameSize = 15;
// const { Videogame, Genre } = require("../db");

// const AllVideogames = async (req, res) => {
//   try {
//     const videogameDb = async () => {
//       return await Videogame.findAll({
//         include: Genre,
//       });
//     };
//     const videogameAPI = async () => {
//       const { page = 1 } = req.query;
//       const responseUno = await axios.get(
//         `https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&page_size=${gameSize}&page=${page}`
//       );
//       const receivedData = responseUno.data;

//       if (receivedData && receivedData.results) {
//         const mapeo = receivedData.results.map((m) => {
//           const platforms = m.platforms.map((e) => e.platform.name);
//           const genres = m.genres.map((e) => e.name);

//           return {
//             id: m.id,
//             name: m.name,
//             released: m.released,
//             background_image: m.background_image,
//             rating: m.rating,
//             platforms: platforms,
//             description: m.description,
//             genres: genres,
//           };
//         });
//         return mapeo;
//       } else {
//         throw new Error("Datos de la API no son válidos");
//       }
//     };

//     // Llama a la función para obtener todos los juegos y espera a que se complete antes de continuar
//     const dbInfo = await videogameDb();

//     const apiData = await videogameAPI();
//     const total = apiData.concat(dbInfo);

//     // Envía la respuesta al cliente
//     res.status(200).json(total);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = AllVideogames;


const axios = require("axios");
const gameSize = 15;
const { Videogame, Genre } = require("../db");

const AllVideogames = async (req, res) => {
  try {
    const videogameDb = async () => {
      const { page = 1 } = req.query;
      const offset = (page - 1) * gameSize;

      return await Videogame.findAll({
        include: Genre,
        limit: gameSize,
        offset: offset,
      });
    };

    const videogameAPI = async () => {
      const { page = 1 } = req.query;
      const responseUno = await axios.get(
        `https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&page_size=${gameSize}&page=${page}`
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

    // Llama a la función para obtener todos los juegos de la base de datos y espera a que se complete antes de continuar
    const dbInfo = await videogameDb();

    // Llama a la función para obtener todos los juegos de la API y espera a que se complete antes de continuar
    const apiData = await videogameAPI();

    // Combina las respuestas de la API y la base de datos
    const total = apiData.concat(dbInfo);

    // Envía la respuesta al cliente
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = AllVideogames;
