import React,{useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

const base_url="https://image.tmdb.org/t/p/original/" 
function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(() => {
        async function fetchData()  {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    },[]);

    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1) + "...": str;
    } 

    return (
        <header className="banner"
        style={{ 
            // backgroundSize:"100% 100%",
            backgroundImage:`url("${base_url}${movie?.backdrop_path}")`,
            // backgroundPosition: "0 top",
             backgroundAttachment: "fixed",
             backgroundRepeat: 'no-repeat',
            // zIndex:'-2',
            backgroundSize: "100% 100%",
            backgroundPosition: "0 top",
            //backgroundRepeat: "repeat-x",
            backgroundColor: "transparent",
            width: "100%",
            height: "43.5rem",
            top: "auto",
            bottom: "-1px",
            opacity: "0.87",
        }}>
             <div className="banner__contents">
                <h1 className="banner__title">
                 {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button> 
                </div>
                <h1 className="banner__description">{truncate(movie?.overview,350)}</h1>
             </div>
             <div className="banner--fadebottom"/>

        </header>
    )
}

export default Banner
