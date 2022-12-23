import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './User/Login'
import Register from './User/Register'
import Home from './Home';
import Main from './Main';
import Movie from './Movie';
import Account from './User/Account';
import Person from './Person';
import Tvshows from './Tvshows';


function Routing() {
  return (

    <Routes>
        <Route path="/" index element={<Home />}/>
        <Route path="/home" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/movie/:id" element={<Movie />}/>
        <Route path="/tv/:id" element={<Movie />}/>
        <Route path="/person/:id" element={<Person />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/tvshows" element={<Tvshows />}/>
        <Route path="*" element={<Main/>}/>
        </Routes>

  )
}

export default Routing