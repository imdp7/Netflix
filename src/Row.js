import React, {useState,useEffect} from 'react';
import axios from './axios';
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url="https://image.tmdb.org/t/p/original/" 

function Row({title ,fetchUrl ,isLargeRow}) {
    const [movies, setMovies]= useState([]); 
    const [trailerUrl, setTrailerUrl]= useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data?.results);
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
        console.table(movie);
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              console.log("urlParams = " + urlParams);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
      };

    return (
        <div className="row">
        <h2 className="row__title">{title}</h2>
            <div className="row__inner">
             
                {movies.map(movie => (
                    <div className={"tile"} key={movie.id}>
                    <div className="tile__media">
                    <img className={`tile__img  ${isLargeRow && "row__posterLarge"}`} 
                    key={movie.id} 
                    src={`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                    />
                    
                    </div>
                    </div>
                    
                ))}

        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
    }
export default Row


  