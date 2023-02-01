import { useState } from 'react';

function Day(props) {
    const [dayComplete, setdayComplete] = useState(false);

    return (
      <li className="nav-item text-center" id={props.id}>
        <a className="nav-link" data-bs-toggle="pill">
            <p>{props.date}</p>
            <p>{props.day.substr(0,3)}</p>
            {dayComplete ? (<p>Done</p>) : (<p>Not Done</p>)}
        </a>
      </li>
    );
  }
  
  export default Day;