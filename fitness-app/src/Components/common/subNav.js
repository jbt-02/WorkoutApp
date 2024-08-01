import { useState, useEffect } from 'react';

function SubNav(props){
    
    
    return(
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col">
              <h3>{props.name}</h3>
            </div>
            <div className="col pt-1">
              <a>Edit</a>
            </div>
            <p className="lead">Goal: {props.goal}</p>
           </div>
        </div>
    );
}
export default SubNav;