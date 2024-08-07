import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';

import NavBar from '../Components/common/nav';
import SessionBuildEnv from '../Components/common/sessionBuildEnv';
import SubNav from '../Components/common/subNav';

function BuildSessionPage() {
  const [sessionMetaData, setSessionMetaData] = useState(JSON.parse(localStorage.getItem('sessionMetaData')));

    return (
    <>
        <NavBar/>
        <SubNav
        name={sessionMetaData.name}
        goal={sessionMetaData.goal}
        />
        <SessionBuildEnv
        name={sessionMetaData.name}
        goal={sessionMetaData.goal}
        />
        
    </>
    );
}
//sessionMetaData.name
export default BuildSessionPage;