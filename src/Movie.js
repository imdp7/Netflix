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
import WatchProvider from './WatchProvider';


function truncate(str,n){
    return str?.length > n ? str.substr(0, n-1) + "...": str;
} 

function Movie({match}) {
    const base_url="https://image.tmdb.org/t/p/original/"
    const [movie,setMovie] = useState([])
    const [trailer,setTrailer] = useState([]);
    const [trailerUrl, setTrailerUrl]= useState("");
    const [recommends, setRecommends]= useState([]); 
    const [credits, setCredits]= useState([]); 
    const [providers, setProviders]= useState([]); 
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
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_KEY}&language=en-US`);
            setTrailer(request.data.results);
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

      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}/watch/providers?api_key=${API_KEY}`);
            setProviders(request.data.results);
            return request;
          }
          fetchData();
        },[match.params.id,API_KEY]);


    const opts = {
      height: 390,
      width: 840,
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
            opacity: "1",
        }}>
          <div>
          <Modal id="modal-root" className='flex flex-row justify-center items-center z-25' size="lg" active={showModal} toggler={() => setShowModal(false)}>
               <ModalHeader toggler={() => setShowModal(false)}>
               {movie?.title || movie?.name || movie?.original_name}
               </ModalHeader>
               <ModalBody>
               <div>       
               {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                   </div>
               </ModalBody>
           </Modal>
             <div className="banner__contents">
                <h1 className="banner__title">
                 {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="flex span-x-8">
                <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                <button className="banner__button">My List</button> 

                <button className={`text-white py-3 text-lg font-bold font-sans rounded-lg px-4 hover:bg-gray-300 hover:text-black ${movie?.vote_average < 7 ? "bg-red-500" : "bg-green-500"}`}>{movie?.vote_average} stars</button> 
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
             {movie?.release_date &&(
                <div className='p-2 flex flex-row'>
                  <span className='font-bold text-lg'>
                    Release Date : &nbsp;
                  </span>
                <span className='font-semibold text-lg'>
                {' '}{movie.release_date}
                </span>
                </div>
                )}
             {movie?.belongs_to_collection == "null" &&(
                <div className='p-2 flex flex-row'>
                  <span className='font-bold text-lg'>
                  Belongs to Collection : &nbsp;
                  </span>
                <span className='font-semibold text-lg'>
                {' '}{movie?.belongs_to_collection}
                </span>
                </div>
                )}
             {movie.genres &&(
                <div className='p-2 flex flex-row'>
                  <span className='font-bold text-lg'>
                    Genre : &nbsp;
                  </span>
                <span className='font-semibold text-lg'>
                {' '}{movie.genres[0].name}
                </span>
                </div>
                )}
                {movie.vote_count && (
                <div className='p-2 flex flex-row '>
                <span className='font-bold text-lg'>
                    Vote : &nbsp;
                  </span>
                <span className='font-semibold text-lg'>{movie.vote_count} votes</span>
                </div>
                )}
                {movie.status && (
                <div className='p-2 flex flex-row'>
                <span className='font-bold text-lg'>
                    Status : &nbsp;
                  </span>
                <span className={`font-semibold text-lg ${movie.status =="Released" ? "text-green-500" : "text-red-500"}`}>{movie.status}</span> 
                </div>
                )}
                {movie?.budget && (
                <div className='p-2 flex flex-row'>
                <span className='font-bold text-lg'>
                    Budget : &nbsp;
                  </span>
                <span className="font-semibold text-lg"><CurrencyFormat value={movie?.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                </span> 
                </div>
                )}
                {movie.overview && (
                <div className='p-2 flex flex-col'>
                <span className='font-bold text-lg'>
                    Overview : &nbsp;
                  </span>
                <span className="font-semibold text-lg">{movie.overview}</span> 
                </div>
                )}
                {movie?.production_countries && (
                <div>
                <div className='p-2 flex flex-row mb-2'>
                <span className='font-bold text-lg'>
                    Production Companies : &nbsp;
                  </span>
                  </div>
                {movie?.production_companies?.map(prod => (
                  <div key={prod?.id} className='flex flex-row items-center'>
                    <div className='p-2'>
                    <img src={`${base_url}${prod?.logo_path}`} className='bg-white w-16 h-16 mx-auto  object-contain'/>
                    </div>
                    {prod.name && (
                    <span className='font-semibold text-white text-lg p-2'>{prod?.name}</span>
                    )}
                    {prod.origin_country && (
                    <span className='font-semibold text-white text-lg p-2'>({prod?.origin_country})</span>
                    )}
                  </div>
                ))}
                </div>
                )}

                {movie?.production_countries && (
                  <div>
                <div className='flex flex-row pt-2'>
                <span className='font-bold text-lg'>
                    Production Countries : &nbsp;
                  </span>
                  </div>
                  
                {movie?.production_countries?.map(prod => (
                  <div key={prod?.id} className='flex flex-row w-sm items-center'>
                    { prod.name  && (
                    <span className='font-semibold text-white text-lg p-2'>{prod?.name}</span>
                    )}
                    { prod.iso_3166_1  && (
                    <span className='font-semibold text-white text-lg p-2'>({prod?.iso_3166_1})</span>
                    )}
                  </div>
                ))}
                </div>
                )}
               

                <WatchProvider provider={providers}/>

                <div class="py-4">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                {credits && (
                <div className=' w-full'>
                  <span className='font-extrabold text-white text-2xl'>Casts</span>
                  <div className='row__inner'>
                {credits.map(credit => (

                  <div className="tile">
                  <div className="tile__media">
                    <div className='flex flex-row flex-wrap justify-center items-center'>
                      {credit?.profile_path &&(
                        <Link to={{pathname:`/person/${credit.id}`}} key={credit.id}>
                  <img src={`${base_url}${credit?.profile_path}`} className='max-w-md w-36 object-contain'/>
                      </Link>
                  )}
                  <div className='flex flex-col items-center flex-wrap max-w-2xl'>
                  <span className='text-base items-center'>{credit.name}</span>
                  <span className='text-base items-center'>{credit.known_for_department}</span>
                  <span className='text-sm items-center'>{credit.character}</span>
                  </div>
                  </div>
                  </div>
              </div>

                ))}
                </div>
                </div>
                )}
                  <div class="py-4">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              {trailer && (
                <div className='w-full'>
                  <span className='font-extrabold text-white text-2xl'>More Videos</span>
                  <div className='py-4'>
                    <div className="grid grid-cols-3 gap-3">
                  {trailer.map(t => (
                    <div className='py-2 w-full'>
                       <YouTube videoId={t.key} className='w-auto h-auto'/>
                       </div>
                       ))}
                       </div>
                  </div>
                  </div>
              )}
              <div class="py-4">
                <div class="w-full border-t border-gray-300"></div>
              </div>
                  {recommends && (
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
                  />    
                  </div>
              </div>
              </Link>
                ))}
                </div>
                </div>
                )}

                </div>
              <img src={`${base_url}${movie?.poster_path}`} className='w-72 object-contain self-start'/>
                </div>
              </div>
             
           </div>
        </header>
  )
}

export default Movie