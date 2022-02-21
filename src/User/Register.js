import React, { useState,useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import {generateUserDocument,auth,signInWithGoogle} from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
import hero from '../assets/hero.jpeg'
import TextField from '@mui/material/TextField';

function Register() {

    const history = useHistory();

  const [user,setUser] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");

  useEffect(() => {
    document.title = ` Create your login | Netflix`;
  },[],6000);

  useEffect(() => {
    (async() =>{
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            setUser({ user });
          });
    })()
  }, [user])

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {FirstName,LastName})
      .then((response) => {
        setEmail(email);
        setPassword(password);
        setFirstName(FirstName);
        setLastName(LastName);
        history.push("/home")
      })
    }
      catch(error){
      toast.error("Error signing up with email and password", error);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }

  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "FirstName") {
      setFirstName(value);
    } else if (name === "LastName") {
      setLastName(value);
    }
  };


  return (
    <div className='flex justify-center items-center'>
     <div className="relative w-full h-full bg-black">
      <ToastContainer/>
  <img className='h-screen w-full bg-center bg-no-repeat bg-cover relative opacity-25' src={hero}/>
        <div className="absolute w-full h-full top-0 left-0 flex flex-col  justify-center items-center ">
          <h2 className=' text-white p-2 font-bold text-2xl'>Sign In</h2>
          <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
          <TextField
          id="FirstName"
          label="First Name"
          type="text"
          variant="filled"
          name="FirstName"
          fullWidth
          className='bg-white w-full'
          value={FirstName}
          onChange = {(event) => onChangeHandler(event)}
          required
        />
    </div>
    <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
          <TextField
          id="LastName"
          label="Last Name"
          type="text"
          variant="filled"
          name="LastName"
          fullWidth
          className='bg-white w-full'
          value={LastName}
          onChange = {(event) => onChangeHandler(event)}
          required
        />
    </div>
    <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
          <TextField
          id="Email"
          label="Email"
          type="email"
          variant="filled"
          name="userEmail"
          fullWidth
          className='bg-white w-full'
          value = {email}
          onChange = {(event) => onChangeHandler(event)}
          required
        />
    </div>
    <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
          <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          name="userPassword"
          fullWidth
          className='bg-white w-full'
          value = {password}
          onChange = {(event) => onChangeHandler(event)}
          required
        />
    </div>
        <div className="flex flex-row p-2 items-center max-w-lg w-full justify-center">
        <button onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
              
            }}
          className="bg-red-600 hover:bg-red-500 w-full py-4 font-base text-white rounded shadow-xl">
          Sign Up
        </button>
          </div>
          <div className="flex flex-row p-2 items-center max-w-lg w-full justify-center">
          <button onClick={signInWithGoogle}
          className="bg-green-600 hover:bg-green-500 w-full py-4 font-base text-white rounded shadow-xl">
          Sign in with Google
        </button>
        </div>
        <div className="flex flex-row p-2 max-w-lg w-full justify-end float-right">
        <Link to={'/login'}><span className="text-white font-medium border border-red-600 p-2">{' '} Login here</span></Link>
        </div>
          </div>
      </div>
    </div>
  )
}

export default Register