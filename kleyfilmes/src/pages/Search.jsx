import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilmeCard from '../components/FilmeCard';
import './FilmeGrid.css'


const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;


const Search = () => {
    const [searchParams] = useSearchParams();

    const [filmes, setFilmes] = useState([]);
    const query = searchParams.get("q");

    const getSearchedFilmes = async (url) => {
        const res = await fetch(url)
        const data = await res.json();
    
        setFilmes(data.results);
      }
    
      useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
    
        getSearchedFilmes(searchWithQueryURL);
      }, [query])
    

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: 
                <span className="query-text">{query}</span>  
            </h2>
            <div className="filmes-container">
            {filmes.length === 0 && <p>Carregando...</p>}
            {filmes.length > 0 && 
            filmes.map((movie) => <FilmeCard  key={movie.id} movie={movie} />)}
            </div>
      </div>
    )
  }
  
  export default Search