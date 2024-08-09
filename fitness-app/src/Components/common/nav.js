import React, { useState } from 'react';
import Cookies from 'js-cookie';

function NavBar() { 

    const [isLoggedIn, setIsLoggedIn] = useState(true);


    const handleisLogIn = () =>{
        setIsLoggedIn(false);

        if(!isLoggedIn){
          Cookies.remove('uid');
        }
    }

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/userPage">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myPrograms">My Programs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mySessions">My Session</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/explore">Explore</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/myMetrics">My Metrics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    );
  }
  
  export default NavBar;
