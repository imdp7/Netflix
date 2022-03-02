import React,{useState,useEffect} from 'react'
import {API_KEY} from './requests'
import axios from 'axios'
import {Link} from 'react-router-dom'
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function Person({match}) {

    const base_url="https://image.tmdb.org/t/p/original/"
    const [person,setPerson] = useState([])
    const [movies,setMovies] = useState([])

    useEffect(() => {
        document.title =`${person?.name} | Profile`;
      },[person],6000);


      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/person/${match.params.id}/movie_credits?api_key=${API_KEY}`);
            setMovies(request.data.cast);
            return request;
        }
        fetchData();
    },[match.params.id,API_KEY]);


      useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/person/${match.params.id}?api_key=${API_KEY}&language=en-US`);
            setPerson(request.data);
            return request;
        }
        fetchData();
    },[match.params.id,API_KEY]);


  return (
    <div className='max-w-full bg-black'>
    <div className='flex-col justify-center span-x-4 w-3xl flex-wrap'>
        <div className='flex flex-row span-x-8 w-4xl justify-start pl-8 pr-8 bg-black pt-16'>
        <div className='w-auto p-2 m-2'>
        <img src={`${base_url}${person?.profile_path}`} className='w-96 object-contain p-2 mx-auto rounded-3xl'/>
        <div className='flex flex-col p-2 m-2 text-white font-bold shadow-2xl bg-black justify-evenly items-center'>
            {person?.name && (
        <span className='text-center text-3xl py-4 font-mono border-b border-white'>
            {person?.name}
        </span>
            )}
        <div class="py-4">
                  <span className={`text-xl ${person?.popularity < 50 ? "text-red-500" : "text-green-500"}`}>
                      Popularity: {person?.popularity}
                  </span>
                </div>
                {person?.known_for_department && (
                    <div className='flex flex-row'>
                        <span>
                        <PersonIcon/>
                        </span>
        <span className='text-lg px-3 text-center'>
            {person?.known_for_department}
        </span>
        </div>
        )}
            {person?.birthday && (
                <div className='flex flex-row'>
                    <span>
                    <CakeIcon/>
                    </span>
        <span className='text-lg px-3 text-center'>
            {person?.birthday}
        </span>
        </div>
            )}
            {person.deathday && (
                <div className='flex flex-row'>
                <span>
                    <LocalHospitalIcon/>
                </span>
        <span className='text-lg px-3 text-center'>
            {person?.deathday}
        </span>
        </div>
            )}
            {person?.place_of_birth && (
                <div className='flex flex-row'>
                <span>
                    <PlaceIcon/>
                </span>
        <span className='text-lg px-3 text-center'>
            {person?.place_of_birth}
        </span>
        </div>
            )}
        </div>
            {person?.also_known_as?.length > 0 && (
        <div className='flex flex-col p-2 m-2 mx-auto text-black bg-gray-200 items-center shadow-2xl'>
            <div>
                <span className='text-xl font-bold items-center'>
                    Also Known as
                </span>
            </div>
            {person?.also_known_as?.map(per => (
                <ul className='text-xl list-disc items-center flex flex-wrap'>{per}</ul>
            ))}
        </div>
            )}
        </div>
        {person?.biography && (
        <div className='flex flex-wrap w-full p-2 text-xl  bg-black rounded-2xl m-2 shadow-2xl'>
        <span className='text-white p-2 justify-evenly'>
            {person?.biography}
        </span>
        </div>
        )}
        </div>
       
        
        {movies && (
                <div className='w-2xl flex-wrap flex-col p-2'>
                  <span className='font-extrabold text-white text-2xl'>Movies by {person.name}</span>
                  <div className='row__inner'>
                {movies.map(movie => (
                  <Link to={{pathname:`/movie/${movie.id}`}} key={movie.id}>
                  <div className={"tile"} key={movie.id}>
                  <div className="tile__media">
                  <img className={"tile__img "} 
                  key={movies.id} 
                  src={`${base_url}${movie.poster_path}`} 
                  alt={movie.name}
                  />    
                  </div>
              </div>
              </Link>
                ))}
                </div>
                </div>
        )}
    </div>
    </div>
  )
}

export default Person