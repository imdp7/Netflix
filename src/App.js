import React,{useContext} from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Main from './Main'
import Login from './User/Login'
import {UserProvider,UserContext} from './Providers/UserContext'
import Home from './Home';
import Register from './User/Register';
import Routing from './Routing';
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
  {
    path: "/login",
    component: Login,
    exact: true
  },
  {
    path: "/register",
    component: Register,
    exact: true
  },
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

  const { user } = useContext(UserContext);
  
  return (
    <UserProvider>
    <Router> 
    <div className="App">
      <Nav />
        {user ?
      <div className="app__body">
          <Routes>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
            ))}
      </Routes>
    </div>
    : <Routing /> }
    </div>
    </Router> 
    </UserProvider>
  );
}

export default App;
