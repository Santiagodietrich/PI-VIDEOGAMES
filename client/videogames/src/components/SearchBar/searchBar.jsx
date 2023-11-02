// import { useState } from "react";


// export default function SearchBar ({onSearch}){

//     const [name,setName]=useState("");
//     const handleChange=(event)=>{
//         let value=event.target.value
//         setName(value)
//     }

//     return(

//         <div>
//             <input placeholder="Enter your videogame..." onChange={handleChange} value={name} type="search"></input>
//             <button onClick={()=>onSearch(name)}>Search</button>
//         </div>
//     )

// }


import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

  const handleChange = (event) => {
    let value = event.target.value;
    setName(value);
  }
console.log("search",searchResults)
  const handleSearch = async () => {
    const results= await onSearch(name);
     setSearchResults(results);
  }

  return (
    <div>
      <input
        placeholder="Enter your videogame..."
        onChange={handleChange}
        value={name}
        type="search"
      />
      <button onClick={handleSearch}>Search</button>
      {/* {searchResults.length > 0 && (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {searchResults.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
