import { useState,useEffect } from "react";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import validation from "./validation";
import { getGenres,createVideoGame } from "../../redux/actions";
import styles from "./formPage.module.css";
import mario from "../../assets/Mario.png";
import wario from "../../assets/Wario.png";




export default function Form (){

    const dispatch=useDispatch();

    const allGenres=useSelector((state)=>state.generos)

    console.log("generos",allGenres)

    const initialForm={
        name:"",
        background_image:"",
        description:"",
        platforms:[],
        released:"",
        rating:0,
        genres:[]
    }

    
    // useEffect(()=>{
    //     async function fetchData(){
    //         try{
    //             const response=await axios.get(`https://api.rawg.io/api/genres?key=574a2e1d874a498db48bf6179e7cbd2a`);
    //             // setData(response.data)
    //             setData({...data,genres:response.data.results})
    //         }catch(error){
    //             window.alert(error.message)
    //         }
    //     }
    //     fetchData();
    // },[]);

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])

    const [data,setData]=useState(initialForm);
    const [errors,setErrors]=useState({});

    console.log("estado",data);

    const handleChange=(event)=>{
        const property=event.target.name;
        const value=event.target.value;
        setErrors(validation({...data,[property]:value}))
        setData({...data,[property]:value})
    }

    const handlePlatforms=(h)=>{
        setData({
            ...data,
            platforms:[...data.platforms,h.target.value]
        })

    }

    const handleGenres=(e)=>{
        setData({
            ...data,
            genres:[...data.genres,e.target.value]
        })
    }


    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Realiza aquí la lógica para enviar el formulario, por ejemplo, una solicitud POST a un servidor.
        try {
          // Enviar los datos del formulario a través de una solicitud POST utilizando axios u otra biblioteca.
          // Ejemplo:
        //   const response = await axios.post("URL_DE_API", data);

          dispatch(createVideoGame(data))
        //   console.log("Formulario enviado con éxito:", response.data);
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
        }
      };

    

    // return (
    //     <div>
    //     <div>
    //       <form className={styles.formContainer} onSubmit={handleSubmit}>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Name">Name</label>
    //           <input className={styles.formInput} placeholder="Name" type="text" name="name" value={data.name} onChange={handleChange}></input>
    //           <span className={styles.formError}>{errors.name}</span>
    //         </div>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Description">Description</label>
    //           <textarea className={styles.formInput} type="text" name="description" value={data.description}></textarea>
    //           <span className={styles.formError}>{errors.description}</span>
    //         </div>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Released">Released</label>
    //           <input className={styles.formInput} type="text" name="released" value={data.released} placeholder='YYYY-MM-DD'></input>
    //           <span className={styles.formError}>{errors.released}</span>
    //         </div>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Rating">Rating</label>
    //           <input className={styles.formInput} type="text" name="rating" value={data.rating} placeholder="rating" ></input>
    //           <span className={styles.formError}>{errors.rating}</span>
    //         </div>
    //         <div>
    //           <input className={styles.formInput}  type="file" name="background_image" placeholder="image" onChange={handleChange} value={data.background_image}></input>
    //           <span className={styles.formError}>{errors.background_image}</span>
    //         </div>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Platforms">Platforms</label>
    //           <select className={styles.formSelect} name="platforms" id="Platforms" onChange={handlePlatforms}>
    //             <option value="PC">PC</option>
    //             <option value="Xbox Series">Xbox Series</option>
    //             <option value="PlayStation Series">PlayStation Series</option>
    //             <option value="Nintendo Series">Nintendo Series</option>
    //             <option value="Sega Series">Sega Series</option>
    //           </select>
    //           <span className={styles.formError}>{errors.platforms}</span>
    //         </div>
    //         <div>
    //           <label className={styles.formLabel} htmlFor="Genres">Genres</label>
    //           <select className={styles.formSelect} multiple={true} name="genres" id="Genres" onChange={handleGenres}>
    //             <option disabled={true} value="default"></option>
    //             {allGenres?.map(genre => (
    //               <option key={genre.name} value={genre.name}>{genre.name}</option>
    //             ))}
    //           </select>
    //           <span className={styles.formError}>{errors.genres}</span>
    //         </div>
    //         <div>
    //           <button className={styles.formButton} type="submit">Create</button>
    //         </div>
    //       </form>
    //     </div>

    //     <img className={styles.mario} src={mario} alt="mario" />
    //     <img className={styles.wario} src={wario} alt="wario" />
    //     </div>
    //   );
      


  return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Name">Name</label>
                    <input placeholder="Name" type="text" name="name" value={data.name} onChange={handleChange}></input>
                    <span>{errors.name}</span>
                </div>
                <div>
                    <label htmlFor="Description">Description</label>
                    <textarea onChange={handleChange} type="text" name="description" value={data.description}></textarea>
                    <span>{errors.description}</span>
                </div>
                <div>
                    <label htmlFor="Released">Released</label>
                    <input onChange={handleChange} type="text" name="released" value={data.released} placeholder='YYYY-MM-DD'></input>
                    <span>{errors.released}</span>
                </div>
                <div>
                    <label htmlFor="Rating">Rating</label>
                    <input onChange={handleChange} type="text" name="rating" value={data.rating} placeholder="rating" ></input>
                    <span>{errors.rating}</span>
                </div>
                <div>
                    <input type="file" name="background_image" placeholder="image" onChange={handleChange} value={data.background_image}></input>
                    <span>{errors.background_image}</span>
                </div>
                <div>
                    <label htmlFor="Platforms">Platforms</label>
                    <select name="platforms" id="Platforms" onChange={handlePlatforms}>
                        <option value="PC">PC</option>
                        <option value="Xbox Series">Xbox Series</option>
                        <option value="PlayStation Series">PlayStation Series</option>
                        <option value="Nintendo Series">Nintendo Series</option>
                        <option value="Sega Series">Sega Series</option>
                    </select>
                    <span>{errors.platforms}</span>
                </div>
                {/* <div>
                    <label htmlFor="Genres">Genres</label>
                
                    <select multiple="true" name="genres" id="Genres" onChange={handleGenres}>
                        <option disabled={true} value="default"></option>
                            {allGenres.map(genre => (
                                <option key={genre.name} value={genre.name}>{genre.name}</option>
                            ))}
                    </select>

                    <span>{errors.genres}</span>
                </div> */}

              <div >
                <label>Genre:</label>
                  <select defaultValue={'default'} name="genre" onChange={handleGenres}>
                    <option disabled={true} value='default'></option>
                      {allGenres?.map(el => (       
                        <option key={el} value={el}>{el}</option>
                      ))}
                  </select>
                      <span>{errors.genres}</span>
              </div>

                <div>
                    <button type="submit">Create</button>
                </div>

            </form>
        </div>
      )


}