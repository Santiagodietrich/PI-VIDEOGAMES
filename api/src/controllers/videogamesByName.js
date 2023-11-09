
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const videogamesByName = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a&search=${name}&page_size=15`);
        const gameData = response.data.results;

        if (gameData.length > 0) {
            const mappedGames = gameData.map((game) => {
                const platforms = game.platforms.map((e) => e.platform.name);
                const genres = game.genres.map((g) => g.name);

                return {
                    id: game.id,
                    name: game.name,
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: platforms,
                    genres: genres,
                    background_image: game.background_image,
                };
            });

            res.json(mappedGames);
        } else {
            res.status(404).json({ message: "No se encontraron videojuegos" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la búsqueda de videojuegos" });
    }
};

module.exports = videogamesByName;
