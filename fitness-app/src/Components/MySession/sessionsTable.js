import { useState } from 'react';
import Axios from 'axios';

import './sessionsTable';

function SessionsTable(props) {
    const [hasSessions, setHasSessions] = useState(false);
  
    return (
        <table className="table">
            <thead>
                <tr className="table-secondary">
                    <th>Name</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {hasSessions ? (<><td>WorkoutName</td>
                <td>Date</td></>) : (<td>No Workouts</td>)}
            </tbody>
        </table>
    );
  }
  
  export default SessionsTable;