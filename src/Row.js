import React, {useState,useEffect} from 'react';
import axios from './axios';
import './row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url="https://image.tmdb.org/t/p/original/" 

function Row({title ,fetchUrl ,isLargeRow}) {
    const [movies, setMovies]= useState([]); 
    const [trailerUrl, setTrailerUrl]= useState("");

    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay: 1,

        },
    };
    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || "")
            .then((url) => {
               const urlParams = new URLSearchParams(new URL (url).search);
               setTrailerUrl(urlParams.get('v'));
            })
            .catch((err) => console.log(err));
        }
    };
    return (
        <div className="row">
        <h2 className="row__title">{title}</h2>
            <div className="row__inner">
             
                {movies.map(movie => (
                    <div className={"tile"}>
                    <div className="tile__media">
                    <img className={`tile__img  ${isLargeRow && "row__posterLarge"}`} 
                    key={movie.id} src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                    />
                    <div className="tile__details">
                        <div className="tile__title">
                            {movie?.title}
                        </div>
                        </div>
                    </div>
                    </div>
                    
                ))}
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
        </div>
    )
    }
export default Row


  