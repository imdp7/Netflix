import React,{useContext} from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Main from './Main'
import Login from './User/Login'
import Home from './Home';
import Register from './User/Register';
import Routes from './Routes';
import Movie from './Movie';
import Account from './User/Account';
import Tvshows from './Tvshows';

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={true}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const routes = [
  
  {
    path: "/home",
    component: Main,
    exact: true
  },
  {
    path: "/",
    component: Home,
    exact: true
  },
  // {
  //   path: "/login",
  //   component: Login,
  //   exact: true
  // },
  // {
  //   path: "/register",
  //   component: Register,
  //   exact: true
  // },
  {
    path: "/account",
    component: Account,
    exact: true
  },
  {
    path: "/tvshows",
    component: Tvshows,
    exact: true
  },
];


function App() {
  
  return (
    <Router> 
    <div className="App">
<<<<<<< HEAD:src/App.jsx
      <Nav />
        {user ?
=======
      <Nav/>
>>>>>>> 9d5f8c73f212634a88064620c17125365c5665aa:src/App.js
      <div className="app__body">
          <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
            ))}
      </Switch>
    </div>
    </div>
    </Router> 
  );
}

export default App;
