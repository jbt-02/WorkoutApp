import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

import NavBar from '../Components/common/nav';
import SessionBuildEnv from '../Components/common/sessionBuildEnv';

function BuildSessionPage() {
  const [sessionMetaData, setSessionMetaData] = useState(JSON.parse(localStorage.getItem('sessionMetaData')));

    return (
    <>
        <NavBar/>
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col">
              <h3>{sessionMetaData.name}</h3>
            </div>
            <div className="col pt-1">
              <a>Edit</a>
            </div>
            <p className="lead">Goal: {sessionMetaData.goal}</p>
          </div>
        </div>
        <SessionBuildEnv/>
        
    </>
    );
}

export default BuildSessionPage;