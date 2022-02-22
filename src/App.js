import React,{useContext} from 'react';
import './App.css';
import Nav from './Nav';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Main from './Main'
import Login from './User/Login'
import Home from './Home';
import {UserProvider,UserContext} from './Providers/UserContext'
import Register from './User/Register';
import Routes from './Routes';
import Movie from './Movie';

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
];


function App() {
  const { user } = useContext(UserContext);
  
  return (
    <UserProvider>
    <Router> 
    <div className="App">
      <Nav/>
        {user ?
      <div className="app__body">
          <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
            ))}
      </Switch>
    </div>
      : <Routes/> }
    </div>
    </Router> 
    </UserProvider>
  );
}

export default App;
