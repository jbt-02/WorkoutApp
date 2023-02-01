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
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Logo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/userPage">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/myPrograms">My Programs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/mySessions">My Session</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/explore">Explore</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/myMetrics">My Metrics</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    );
  }
  
  export default NavBar;
