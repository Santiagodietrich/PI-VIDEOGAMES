const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const videogamesByName = async (req, res) => {
    const { name } = req.query;
    try {
        // Busca en la BD
        const dbGames = await Videogame.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        if (dbGames) {
            return res.status(200).json(dbGames);
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=574a2e1d874a498db48bf6179e7cbd2a`);
            const gameData = response.data.results; // Cambio aquí para obtener los resultados
           
            


            if (gameData.length > 0) {
                // Tomamos el primer resultado, pero puedes ajustar la lógica según tus necesidades
                const firstGame = gameData[0];

                let platforms=[];//mientras mapeo las plataformas pusheo la propiedad name de cada una a este arreglo y luego lo uso para retornarlo
                
                firstGame.platforms.map((e)=>{
                platforms.push(e.platform.name);
                });

                
                let genres=[];

                firstGame.genres.map((g)=>{
                    genres.push(g.name)
                });

                const videoG = {
                    id: firstGame.id,
                    name: firstGame.name,
                    description: firstGame.description,
                    released: firstGame.released,
                    rating: firstGame.rating,
                    platforms:platforms,
                    genres:genres,
                    background_image: firstGame.background_image
                };
                res.json(videoG);
            } else {
                res.status(404).json({ message: "No se encontró el videojuego" });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en la búsqueda del videojuego" });
    }
};

module.exports = videogamesByName;
