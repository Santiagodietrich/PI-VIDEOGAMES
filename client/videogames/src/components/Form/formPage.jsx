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
        platforms:"",
        released:"",
        rating:0,
        genres:[]
    }

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])

    const [data,setData]=useState(initialForm);
    const [errors,setErrors]=useState({});

    console.log("estado",data);

    const handleChange = (event) => {
        const property = event.target.name;
        let value = event.target.value;
        console.log("proper",property)
        // Si el campo es "rating", convierte el valor a un número de punto flotante
        if (property === 'rating') {
            value = parseFloat(value);
        }
    
        setErrors(validation({ ...data, [property]: value }));
        setData({ ...data, [property]: value });
    };
    
    

    // const handlePlatforms=(h)=>{
    //     setData({
    //         ...data,
    //         platforms:[...data.platforms,h.target.value]
    //     })

    // }

    const handleGenres=(e)=>{
        setData({
            ...data,
            genres:[...data.genres,e.target.value]
        })
    }

    // function handleRating(e) {
    //     const inputValue = e.target.value;
    //     setData({ ...data, rating: parseFloat(inputValue) });
    
    //     const validationErrors = validation({ ...data, rating: inputValue });
    //     setData(validationErrors);
            
    //     }

    // const handleRating = (event) => {
    //     const inputValue = event.target.value;
    //     const ratingValue = parseFloat(inputValue);
    
    //     setErrors(validation({ ...data, rating: inputValue }));
    //     setData({ ...data, rating: ratingValue });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // Realiza aquí la lógica para enviar el formulario, por ejemplo, una solicitud POST a un servidor.
    //     try {
    //       // Enviar los datos del formulario a través de una solicitud POST utilizando axios u otra biblioteca.
    //       // Ejemplo:
    //     //   const response = await axios.post("URL_DE_API", data);

    //       dispatch(createVideoGame(data))
    //     //   console.log("Formulario enviado con éxito:", response.data);
    //     } catch (error) {
    //       console.error("Error al enviar el formulario:", error);
    //     }
    //   };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createVideoGame(data));
        window.alert("Videojuego creado exitosamente")
    }


  return(
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.formLabel} htmlFor="Name">Name</label>
                    <input className={styles.formImput} placeholder="Name" type="text" name="name" value={data.name} onChange={handleChange}></input>
                    <span className={styles.formError}>{errors.name}</span>
                </div>
                <div>
                    <label className={styles.formLabel} htmlFor="Description">Description</label>
                    <textarea className={styles.formImput} onChange={handleChange} type="text" name="description" value={data.description}></textarea>
                    <span className={styles.formError}>{errors.description}</span>
                </div>
                <div>
                    <label className={styles.formLabel} htmlFor="Released">Released</label>
                    <input className={styles.formImput} onChange={handleChange} type="text" name="released" value={data.released} placeholder='YYYY-MM-DD'></input>
                    <span className={styles.formError}>{errors.released}</span>
                </div>
                <div>
                    <label className={styles.formLabel} htmlFor="Rating">Rating</label>
                    <input className={styles.formImput} onChange={handleChange} type="number" step="0.1" name="rating" value={data.rating} placeholder="rating" ></input>
                    <span className={styles.formError}>{errors.rating}</span>
                </div>



                <div>
                    <input className={styles.formImput}  type="file" name="background_image" placeholder="image" onChange={handleChange} value={data.background_image}></input>
                    <span className={styles.formError}>{errors.background_image}</span>
                </div>
                <div>
                    <label className={styles.formLabel} htmlFor="Platforms">Platforms</label>
                    <select className={styles.formSelect} name="platforms" id="Platforms" onChange={handleChange}>
                        <option value="PC">PC</option>
                        <option value="Xbox Series">Xbox Series</option>
                        <option value="PlayStation Series">PlayStation Series</option>
                        <option value="Nintendo Series">Nintendo Series</option>
                        <option value="Sega Series">Sega Series</option>
                    </select>
                    <span className={styles.formError}>{errors.platforms}</span>
                </div>
               
              <div >
                <label className={styles.formLabel}>Genre:</label>
                  <select className={styles.formSelect} defaultValue={'default'} name="genre" onChange={handleGenres}>
                    <option disabled={true} value='default'></option>
                      {allGenres?.map(el => (       
                        <option key={el} value={el}>{el}</option>
                      ))}
                  </select>
                      <span className={styles.formError}>{errors.genres}</span>
              </div>

                <div>
                    <button className={styles.formButton} type="submit">Create</button>
                </div>
            </form>
            <img className={styles.mario} src={mario} alt="mario" />
            <img className={styles.wario} src={wario} alt="wario" />

        </div>
      )


}