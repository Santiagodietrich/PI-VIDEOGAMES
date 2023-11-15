const axios=require("axios");
const {Videogame,Genre}=require("../db")

const VideogamesId=async(req, res)=>{
    try{
        const id=req.params.id;

        if( esUUIDv4(id)){
            let database=await Videogame.findOne({
                where:{id:id},
                include:{model:Genre}
            })
            if(database){
                const game=await Videogame.findAll({
                    attributes:["name","rating","description","released","platforms"],
                    include:{model:Genre}
                })
                res.status(200).json(database)
            }
        }else{
            let resultado=await axios.get(`https://api.rawg.io/api/games/${id}?key=574a2e1d874a498db48bf6179e7cbd2a`);

                let platforms=[];//mientras mapeo las plataformas pusheo la propiedad name de cada una a este arreglo y luego lo uso para retornarlo
                
                resultado.data.platforms.map((e)=>{
                    platforms.push(e.platform.name);
                });
            
                let genres=[];//mientras mapeo los generos pusheo la propiedad name de cada uno a este arreglo y luego lo uso para retornarlo
                console.log("geeenre",genres)
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
        }


    }catch(error){
        res.status(500).json({error:"Error interno del servidor"})
    }
}


function esUUIDv4(id) {
    const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(id);
  }


module.exports=VideogamesId;


