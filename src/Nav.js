import React,{useState,useEffect} from 'react'
import './Nav.css'

function Nav() {
    const [show,handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll",() =>{
            if(window.scrollY>100){
                handleShow(true);
            } else handleShow(false);
        });
        return() => {
            window.removeEventListener("scroll");
        }
    },[]);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
              className="nav__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
              />
              <img 
              className="user__logo"
              src="https://pro2-bar-s3-cdn-cf1.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/98032aebff601c1d993e12a0.png?h=eba99c47b726e04e1228d83852b69211"
              alt="User"
              />
        </div>
    )
}

export default Nav
