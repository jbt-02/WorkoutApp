import {React, useState} from "react";

import NavBar from "../Components/common/nav";
import TrackSessionEnv from "../Components/TrackSession/trackSessionEnv";
function TrackSessionPage(){
    const [trackMetaData, setTrackMetaData] = useState(JSON.parse(localStorage.getItem('trackMetaData')));
    
    return(
        <>
            <NavBar/>
            <TrackSessionEnv
            rid={trackMetaData.rid}
            sessionTemplate={trackMetaData.routineJSON}
            />
        </>
    );
}
export default TrackSessionPage;
