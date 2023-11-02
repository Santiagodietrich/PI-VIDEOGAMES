import SearchBar from '../SearchBar/searchBar'
import {Link} from 'react-router-dom';


export default function NavBar ({onSearch}){

    return(
        <div>
            <div>
                <nav>
                    <SearchBar onSearch={onSearch}></SearchBar>
                    <ul>
                        <button>
                            <Link to={"/home"}>Home</Link>
                        </button>
                    </ul>

                    <ul>
                        <button>
                            <Link to={"/form"}>Create Videogame</Link>
                        </button>
                    </ul>
                </nav>
            </div>
        </div>
    )

}