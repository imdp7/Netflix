import React,{useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody"
import YouTube from 'react-youtube';

const base_url="https://image.tmdb.org/t/p/original/" 
function Banner() {
    const [movie,setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl]= useState("");
    const [showModal, setShowModal] = useState(false);

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
    
    const handleClick = (movie) => {
      
        if (!trailerUrl) {
          setTrailerUrl("");
        } else {
          setMovie(movie?.title || movie?.name || movie?.original_name || "")
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
            setShowModal(true)
              })
              .catch((error) => console.log(error));
          }
        };

        const opts = {
            height: '390',
            width: '840',
              playerVars: {
                  autoplay: 1,
      
              },
          };

    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1) + "...": str;
    } 

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
             <div className="banner__contents">
                <h1 className="banner__title">
                 {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="flex">
                <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                <button className="banner__button">My List</button>
                <button className={`text-white py-3 text-lg font-bold font-sans rounded-lg px-4 hover:bg-gray-300 hover:text-black ${movie?.vote_average < 7 ? "bg-red-500" : "bg-green-500"}`}>{movie?.vote_average} stars</button> 
                </div>
                <h1 className="banner__description">{truncate(movie?.overview,350)}</h1>
             </div>
             <div className="banner--fadebottom"/>
             <Modal id="modal-root" className='flex flex-row justify-center items-center z-25' size="lg" active={showModal} toggler={() => setShowModal(false)}>
               <ModalHeader children={() => null} toggler={() => setShowModal(false)}>
               {movie?.title || movie?.name || movie?.original_name}
               </ModalHeader>
               <ModalBody>
               <div>       
               {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                   </div>
               </ModalBody>
           </Modal>
        </header>
    )
}

export default Banner
