const axios=require("axios");
const {Videogame,Genre}=require("../db")

const VideogamesId=async (req,res)=>{
    const {id}=req.params
    if(!id) return res.status(400).send("id no encontrado")

    try{
        let resultado=await axios.get(`https://api.rawg.io/api/games/${id}?key=574a2e1d874a498db48bf6179e7cbd2a`);

        let platforms=[];//mientras mapeo las plataformas pusheo la propiedad name de cada una a este arreglo y luego lo uso para retornarlo
        
        resultado.data.platforms.map((e)=>{
            platforms.push(e.platform.name);
        });
       
        let genres=[];//mientras mapeo los generos pusheo la propiedad name de cada uno a este arreglo y luego lo uso para retornarlo

        resultado.data.genres.map((e)=>{
            genres.push(e.name);
        });

        return res.status(200).json({
            name:resultado.data.name,
            description:resultado.data.description,
            released:resultado.data.released,
            rating:resultado.data.rating,
            platforms:platforms,
            genres:genres,
            background_image:resultado.data.background_image
        });


    }catch(error){
        try{
            let database=await Videogame.findByPk(id,{include:[{
                model:Genre,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }]});
            let genres=[];

            database.Genres.map((el)=> genres.push(el.name));
            let platforms=database.platforms.split(" ");

            return res.status(200).json({
                id:database.id,
                name:database.name,
                description:database.description,
                released:database.released,
                rating:database.rating,
                platforms:platforms,
                genres:genres,
                background_image:database.background_image,
            });


        }catch(error){
            return res.status(404).send("No se encontro la ID")
        }
    }
}

module.exports=VideogamesId;


