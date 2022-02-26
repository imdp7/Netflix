import React from 'react'
import { Route } from 'react-router-dom';
import Login from './User/Login'
import Register from './User/Register'
import Home from './Home';
import Main from './Main';
import Movie from './Movie';
import Account from './User/Account';

function Routes() {
  return (
    <div>
        <Route path="/" component={Home}  exact={true}/>
        <Route path="/home" component={Main}  exact={true}/>
        <Route path="/login" component={Login}  exact={true}/>
        <Route path="/movie/:id" component={Movie}  exact={true}/>
        <Route path="/register" component={Register} exact={true}/>
        <Route path="/account" component={Account} exact={true}/>
    </div>
  )
}

export default Routes