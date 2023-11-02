const {Genre}=require("../db");
const axios=require("axios");


const Genres=async (req, res)=>{
    
    let genres=await Genre.findAll();

    if(genres.length ===0){
        try{
            let genres=await axios(`https://api.rawg.io/api/genres?key=574a2e1d874a498db48bf6179e7cbd2a`)

            let array=[];

            for(let i=0;i< genres.data.results.length;i++){
                array.push(genres.data.results[i].name);
                await Genre.create({name:genres.data.results[i].name});
            }

            return res.status(200).json(array);

        }catch(error){
            return res.status(400).send("Error");
        }
    }else{
        let array=[];
        genres.map((el)=>array.push(el.name));
        return res.status(200).json(array);
    }

}
module.exports=Genres;