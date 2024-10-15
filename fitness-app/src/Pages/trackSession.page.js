import {React, useState} from "react";

import NavBar from "../Components/common/nav";
import TrackSessionEnv from "../Components/TrackSession/trackSessionEnv";
function TrackSessionPage(){
    const [trackMetaData, setTrackMetaData] = useState(JSON.parse(localStorage.getItem('trackMetaData')));
    const [rid, setRid] = useState();
    
    return(
        <>
            <NavBar/>
            <TrackSessionEnv
            rid={rid}
            sessionTemplate={trackMetaData.routineJSON}
            />
        </>
    );
}
export default TrackSessionPage;
