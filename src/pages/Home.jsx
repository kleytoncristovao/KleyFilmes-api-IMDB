import { useState, useEffect } from "react"
import FilmeCard from "../components/FilmeCard";
import Filme from "./Filme";

import './FilmeGrid.css';

const filmesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topFilmes, setTopFilmes] =useState([])

  const getTopRatedFilmes = async (url) => {
    const res = await fetch(url)
    const data = await res.json();

    setTopFilmes(data.results);
  }

  useEffect(() => {
    const topRatedUrl = `${filmesURL}top_rated?${apiKey}`

    getTopRatedFilmes(topRatedUrl);
  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="filmes-container">
        {topFilmes.length === 0 && <p>Carregando...</p>}
      {topFilmes.length > 0 && 
        topFilmes.map((movie) => <FilmeCard  key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home