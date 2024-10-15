import {React, useState} from "react";

import '../common/css/sessionBuildEnv.style.css';

function TrackSessionEnv(props){
    const [rid, setRID] = useState(props.rid);
    const [templateJSON, setTemplateJSON] = useState(props.sessionTemplate);
    return(
        <div className="container-fluid text-center pb-4" id="sessionEnv">
            <div className="row">
                <h6>Day 1</h6>
            </div>

            <div className="form-group row pb-3">
                <textarea className="form-control col-sm-6 textarea" rows="10" placeholder="Warmup"></textarea>
            </div>
            {JSON.stringify(templateJSON)}
            {}
        </div>
    );
}
export default TrackSessionEnv;
