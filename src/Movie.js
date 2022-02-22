import React,{useState,useEffect} from 'react'
import {API_KEY} from './requests'
import axios from 'axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'


function truncate(str,n){
    return str?.length > n ? str.substr(0, n-1) + "...": str;
} 

function Movie({match}) {
    const base_url="https://image.tmdb.org/t/p/original/"
    const [movie,setMovie] = useState([])
    const [trailerUrl, setTrailerUrl]= useState("");

    useEffect(() => {
        document.title =`${movie?.title || movie?.name || movie?.original_name}`;
      },[movie],6000);

      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_KEY}`);
            setMovie(request.data);
            return request;
        }
        fetchData();
    },[match.params.id,API_KEY]);

    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            autoplay: 1,

        },
    };

    const handleClick = (movie) => {

        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
      };

  return (

        <header className="banner"
        style={{ 
            // backgroundSize:"100% 100%",
            backgroundImage:`url("${base_url}${movie?.backdrop_path}")`,
            // backgroundPosition: "0 top",
             backgroundAttachment: "fixed",
             backgroundRepeat: 'no-repeat',
             zIndex:'-200',
            objectFit:'cover',
            backgroundSize: "100% 100%",
            backgroundPosition: "0 top",
            //backgroundRepeat: "repeat-x",
            backgroundColor: "transparent",
            width: "100%",
            height: "49.5rem",
            top: "auto",
            bottom: "-1px",
            opacity: "1",
        }}>
             <div className="banner__contents">
                <h1 className="banner__title">
                 {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <h1 className="flex flex-row font-serif font-semibold justify-center pb-2 max-w-2xl  items-center text-xl text-white">
                {movie.tagline}
                </h1>
                <div className="banner__buttons pt-2">
                <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                <button className="banner__button">My List</button> 
                <button className="banner__button bg-green-600">{movie.status}</button> 
                <button className="banner__button bg-red-600">{movie.vote_average} stars</button> 
                <span className='font-bold border border-white p-2'>{movie.vote_count} votes</span>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview,350)}</h1>
             </div>
             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
             <div className="banner--fadebottom"/>

        </header>

  )
}

export default Movie