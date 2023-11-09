const axios = require("axios");


const AllVideogames = async (req, res) => {
    try {

        // const experimento=100/gameSize;
        
      
        
        // const startIndex = (paginado - 1) * gameSize;
        // console.log("paginado",paginado)

        const responseUno = await axios.get(`https://api.rawg.io/api/games?key=574a2e1d874a498db48bf6179e7cbd2a`);
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

            res.status(200).json(mapeo);
        } else {
            res.status(500).json({ error: "Datos de la API no son válidos" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = AllVideogames;
