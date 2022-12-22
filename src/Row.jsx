import React, {useState,useEffect} from 'react';
import axios from './axios';
import './row.css'
import{Link} from 'react-router-dom'

const base_url="https://image.tmdb.org/t/p/original/" 

function Row({title ,fetchUrl ,isLargeRow,props}) {
    const [movies, setMovies]= useState([]);
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
      };

    const onLeave = () => {
    setHover(false);
    };

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

    return (
        <div className="row">
        <span className="font-extrabold text-white m-2 p-3 text-2xl">{title}</span>
            <div className="row__inner">
              
                {movies.map((movie) => (

                  <Link to={{pathname:`/${props}/${movie.id}`}} key={movie?.id}>
                    <div className={"tile max-w-2xl w-lg"}>
                    <div className="tile__media">
                    <img className={`tile__img  ${isLargeRow && "row__posterLarge"}`}
                    onMouseLeave={onLeave} 
                    onMouseEnter={onHover} 
                    key={movie.poster_path} 
                    src={`${base_url}${movie.poster_path}`} 
                    alt={movie.name}
                    />
                    <div key={movie.title} className='flex flex-col flex-wrap'>
                        {{tile__img:hover} && ( 
                        <span className='hidden text-white'>
                            {movie.name || movie.title || movie.original_name}
                        </span>
                            )}
                    </div>
                        </div>
                    </div>
                    </Link>

                ))}
        </div>
        </div>
    )
    }
export default Row


  