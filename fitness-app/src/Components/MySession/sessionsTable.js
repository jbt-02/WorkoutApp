import { useState, useEffect } from 'react';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';


import './sessionsTable';

function SessionsTable(props) {
    const [sessions, setSessions] = useState({});
    const [hasSessions, setHasSessions] = useState(false);

    const navigate = useNavigate();
    
    const getSessions = () => {
        Axios.post('http://localhost:3001/displaySessions').then((response) => {
            if(response.data.length !== 0){
              setSessions(response.data);
              setHasSessions(true);
            } else {
              console.log("ERROR");
            }
          });
    }

    useEffect(() => {
      getSessions();  
    },[]);

    return (
        <table className="table table-hover">
            <thead>
                <tr className="table-secondary">
                    <th>Name</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {hasSessions ? sessions.map((obj, index) => (<tr key={index} id={obj.rid} onClick={() =>{localStorage.setItem('trackMetaData', JSON.stringify(obj));
navigate('/trackSession')}}><td>{JSON.parse(obj.routineJSON).name}</td>
                    <td>{String(obj.template_created).slice(0,10)}</td></tr>)) : (<tr><td>No Workouts</td></tr>)
                }
            </tbody>
        </table>
    );
  }
  
  export default SessionsTable;