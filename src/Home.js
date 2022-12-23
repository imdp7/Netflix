import React, {useEffect} from 'react'
import hero from './assets/hero.jpeg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function Home() {

  useEffect(() => {
    document.title = `Netflix | Watch Favourite Movie`;
  },[],6000);

  return (
    <div>
  <div className="relative w-full h-full bg-black">
  <img className='h-screen w-full bg-center bg-no-repeat bg-cover relative opacity-25' src={hero}/>
        <div className="absolute w-full h-full top-0 left-0 rounded-full  flex flex-col justify-center py-4 items-center">
          <h2 className='text-white font-bold text-4xl'>Unlimited movies, TV shows, and more.</h2>
          <h3 className='text-white py-2 font-normal text-3xl'>Watch anywhere. Cancel anytime.</h3>

          <h4 className='text-white py-6 font-base text-xl'>Ready to watch? Enter your email to create or restart your membership.</h4>
          <div className="flex flex-row items-stretch max-w-2xl w-full justify-start">
          <TextField
          id="filled-search"
          label="Email Address"
          type="password"
          name="userEmail"
          variant="filled"
          fullWidth
          className='bg-white max-w-xl'
          required
        />
        <Link to={'/register'}>
        <button
          className="bg-red-600 hover:bg-red-500 max-w-lg h-full p-3 font-base text-white rounded shadow-xl">
          Sign Here
        </button>
        </Link>
    </div>
          </div>
      </div>
    </div>
    
  )
}

export default Home