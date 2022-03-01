import React,{useState,useEffect} from 'react'
import {API_KEY} from './requests'
import axios from 'axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
import CurrencyFormat from 'react-currency-format';
import './row.css'
import { Link } from 'react-router-dom';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";


function truncate(str,n){
    return str?.length > n ? str.substr(0, n-1) + "...": str;
} 

function Movie({match}) {
    const base_url="https://image.tmdb.org/t/p/original/"
    const [movie,setMovie] = useState([])
    const [trailerUrl, setTrailerUrl]= useState("");
    const [recommends, setRecommends]= useState([]); 
    const [credits, setCredits]= useState([]); 
    const [showModal, setShowModal] = useState(false);

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

      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/recommendations?api_key=${API_KEY}&page=1`);
            setRecommends(request.data.results);
            return request;
        }
        fetchData();
    },[match.params.id,API_KEY]);
    
      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${API_KEY}&language=en-US`);
            setCredits(request.data.cast);
            return request;
          }
          fetchData();
        },[match.params.id,API_KEY]);

    const opts = {
      height: '390',
      width: '840',
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
          setShowModal(true)
            })
            .catch((error) => console.log(error));
        }
      };

  return (
 
        <header className="banner"
        style={{ 
             backgroundSize:"100% 100%",
            backgroundImage:`url("${base_url}${movie?.backdrop_path}")`,
            opacity:0.8,
            backgroundColor:'rgba(0, 0, 0, 0.1)',
             backgroundPosition: "0 top",
             backgroundAttachment: "fixed",
             backgroundRepeat: 'no-repeat',
             zIndex:'200',
            objectFit:'cover',
            backgroundSize: "100% 100%",
            backgroundPosition: "0 top",
            backgroundRepeat: "repeat-x",
            backgroundColor: "transparent",
            width: "100%",
            height: "49.5rem",
            top: "auto",
            bottom: "-1px",

        }}>
          <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                {movie?.title || movie?.name || movie?.original_name}
                </ModalHeader>
                <ModalBody>
                <p className="text-base leading-relaxed text-gray-600 font-normal">       
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                    </p>
                </ModalBody>
                {/* <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter> */}
            </Modal>
             <div className="banner__contents">
                <h1 className="flex flex-row justify-start items-center text-white max-w-4xl w-xl font-serif font-extrabold text-5xl">
                 {movie?.title || movie?.name || movie?.original_name}
                </h1>
                  <div className='flex flex-row justify-start items-center place-items-center space-x-2 text-white max-w-lg w-lg '>
                {movie.tagline &&(
                <span className="font-serif font-bold pb-2 p-2 text-xl">
                {movie.tagline} 
                </span>
                )}
                
                </div>

                <div className="p-2">
                <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                <button className="banner__button">My List</button>
                
                {movie.vote_average && (
                <button className="banner__button rounded-lg hover:bg-red-600">{movie.vote_average} stars</button> 
                )}
                </div>
                
                <h1 className="banner__description">{truncate(movie?.overview,350)}</h1>
             </div>
             
             <div className="banner--fadebottom"/>
             
             <div className='flex flex-col items-center justify-start bg-black'>
             <div class="py-4">
            <div class="w-full border-t border-white"></div>
            </div> 
             <div className='flex flex-row p-2 pb-4 bg-black flex-wrap'>
                <div className='flex flex-col itmes-center text-white m-2 max-w-4xl w-2xl'>
                <div className='p-2 flex flex-row'>
                  <span className='font-bold text-lg'>
                    Release Date : &nbsp;
                  </span>
             {movie.release_date &&(
                <span className='font-semibold text-lg'>
                {' '}{movie.release_date}
                </span>
                )}
                </div>
                <div className='p-2 flex flex-row'>
                  <span className='font-bold text-lg'>
                    Genre : &nbsp;
                  </span>
             {movie.genres &&(
                <span className='font-semibold text-lg'>
                {' '}{movie.genres[0].name}
                </span>
                )}
                </div>
                <div className='p-2 flex flex-row '>
                <span className='font-bold text-lg'>
                    Vote : &nbsp;
                  </span>
                {movie.vote_count && (
                <span className='font-semibold text-lg'>{movie.vote_count} votes</span>
                )}
                </div>
                <div className='p-2 flex flex-row'>
                <span className='font-bold text-lg'>
                    Status : &nbsp;
                  </span>
                {movie.status && (
                <span className="font-semibold text-lg">{movie.status}</span> 
                )}
                </div>
                <div className='p-2 flex flex-row'>
                <span className='font-bold text-lg'>
                    Budget : &nbsp;
                  </span>
                {movie.budget && (
                <span className="font-semibold text-lg"><CurrencyFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                </span> 
                )}
                </div>
                <div className='p-2 flex flex-col'>
                <span className='font-bold text-lg'>
                    Overview : &nbsp;
                  </span>
                {movie.overview && (
                <span className="font-semibold text-lg">{movie.overview}</span> 
                )}
                </div>
                <div className='p-2 flex flex-row mb-2'>
                <span className='font-bold text-lg'>
                    Production Companies : &nbsp;
                  </span>
                  </div>
                {movie?.production_companies?.map(prod => (
                  <div key={prod?.id} className='flex flex-row items-center'>
                    <div className='p-2'>
                    <img src={`${base_url}${prod?.logo_path}`} className='bg-white w-16 h-16  object-contain'/>
                    </div>
                    <span className='font-semibold text-white text-lg p-2'>{prod?.name}-{prod?.origin_country}</span>
                  </div>
                ))}
                <div className='flex flex-row pt-2'>
                <span className='font-bold text-lg'>
                    Production Countries : &nbsp;
                  </span>
                  </div>
                  
                {movie?.production_countries?.map(prod => (
                  <div key={prod?.id} className='flex flex-row w-sm items-center'>
                    <span className='font-semibold text-white text-lg p-2'>{prod?.name}-{prod?.iso_3166_1}</span>
                  </div>
                ))}
                <div class="py-4">
    <div class="w-full border-t border-gray-300"></div>
</div>
                <div className=' w-full'>
                  <span className='font-extrabold text-white text-2xl'>Casts</span>
                  <div className='row__inner'>
                {credits.map(credit => (

                  <div className={"tile"}>
                  <div className="tile__media">
                    <div className='flex flex-row flex-wrap justify-center items-center'>
                      {credit?.profile_path &&(
                  <img src={`${base_url}${credit?.profile_path}`} className='max-w-md w-36 object-contain'/>)}
                  <div className='flex flex-col items-center'>
                  <span className='text-base items-center'>{credit.name}</span>
                  <span className='text-base items-center'>{credit.known_for_department}</span>
                  </div>
                  </div>
                  </div>
              </div>

                ))}
                </div>
                </div>
<div class="py-4">
    <div class="w-full border-t border-gray-300"></div>
</div>
                <div className='w-full'>
                  <span className='font-extrabold text-white text-2xl'>Recommended Movies</span>
                  <div className='row__inner'>
                {recommends.map(recommend => (
                  <Link to={{pathname:`/movie/${recommend.id}`}} key={recommend.id}>
                  <div className={"tile"} key={recommend.id}>
                  <div className="tile__media">
                  <img className={"tile__img "} 
                  key={recommend.id} 
                  src={`${base_url}${recommend.poster_path}`} 
                  alt={recommend.name}
                  //onClick={() => handleClick(movie)}
                  />    
                  </div>
              </div>
              </Link>
                ))}
                </div>
                </div>

                </div>
              <img src={`${base_url}${movie?.poster_path}`} className='w-72 object-contain self-start'/>
                </div>
              </div>
        </header>

  )
}

export default Movie