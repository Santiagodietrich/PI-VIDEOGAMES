const axios = require("axios");
const gameSize=15

const AllVideogames = async (req, res) => {
    try {
        const {paginado=1}=req.query

        const startIndex=(paginado-1)*gameSize;//indica desde que videojuego debe arrancar a renderizar

        const response = await axios.get(`https://api.rawg.io/api/games?offset=${startIndex}&limit=${gameSize}&page_size=100&key=574a2e1d874a498db48bf6179e7cbd2a`);


        const recibido = response.data; // El objeto completo de la respuesta


        // Asegúrate de que el objeto contiene los datos que deseas mapear
        if (recibido && recibido.results) {
            const mapeo = recibido.results.map((m) => {
                return {
                    id: m.id,
                    name: m.name,
                    released: m.released,
                    background_image: m.background_image,
                    rating: m.rating,
                    platforms: m.platforms,
                    description: m.description
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
