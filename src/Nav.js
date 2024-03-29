import React,{useState,useEffect,useContext} from 'react'
import './Nav.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Redirect,useNavigate } from 'react-router-dom';
import {UserContext} from './Providers/UserContext'
import {auth} from './firebase'
import Search from './Search'

function Nav() {
    const { user } = useContext(UserContext);
    const history = useNavigate();

    const [show,handleShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
            };
    const handleClose = () => {
        setAnchorEl(null);
        };

    // useEffect(() => {
    //     window.addEventListener("scroll",() => {
    //         if(window.scrollY>100){
    //             handleShow(true);
    //         }
    //     });
    //         window.removeEventListener("scroll",null);
    // },[]);

    

    async function logout() {
      await auth.signOut()
      .then(() => {
        setAnchorEl(null);
       history("/")
      })
      .catch(error => {
        error("Cannot Logut", error);
      });
    }

    return (
        <div className={`nav items-center ${show && "nav__black "}`}>

            {user ? 
               <Link to={'/home'}>
            <div className='items-center'>
            <img
              className="nav__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
              />
              </div>
              </Link>
              : 
              <Link to={'/'}>
              <div className='items-center'>
            <img
              className="nav__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
              />
              </div>
              </Link>
            }
            {
              user && show &&(

            <div className={`flex flex-row gap-5 text-black font-bold text-lg font-serif space-x-5 ${show && "text-white"}`}>
              <Link to="/tvshows"><p>TV shows</p></Link>
              <Link to="/home"><p>Movies</p></Link>
              <Link to="/browse"><p>Browse</p></Link>
            </div>
              )
            }

            {user && show  ? 
              <div className={`${show && "nav__black"}`}>
              <Search/>
              </div> :
            null }
              {user ? 
              <div className='items-center'>
              <img 
              className="user__logo"
              src="https://pro2-bar-s3-cdn-cf1.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/98032aebff601c1d993e12a0.png?h=eba99c47b726e04e1228d83852b69211"
              alt="User"
              id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
              />
              <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!user ?
       <Link to='/login'> <MenuItem onClick={handleClose}>Login</MenuItem></Link>
       : null}
        {user ?
        <Link to='/account'>
        <MenuItem onClick={handleClose}>{user.displayName || user.email || user.FirstName}</MenuItem>
        </Link>
        : null }
         {user ?
        <MenuItem onClick={logout}>Logout</MenuItem>
          :null}
      </Menu>
        </div>
      :
      <Link to='/login'>
      <button
      className="flex float-right flex-row text-center items-end bg-red-600 p-3 text-white rounded-lg justify-end text-white">
      Sign In
    </button>
    </Link>
      }

        </div>
    )
}

export default Nav
