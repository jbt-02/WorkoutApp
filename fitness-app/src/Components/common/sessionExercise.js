import { useState } from 'react';

function SessionExercise(props){
    const [sets, setSets] = useState([]);
    
    const handleSetSets = () => {
        setSets([...sets, sets.length + 1]);
    };

    const handleDeleteSet = (index) => {
        setSets(sets.filter((set, i) => i !== index))
    }

    const handleReplacingExercise = () => {
        props.setIsReplacingExercise();
        props.setExerciseList(true);
    }

    return(
        <div className="row bg-white pt-1 pb-4" id={props.eid}>
            <div className="col-1">
                {props.index}
            </div>
            <div className="col-1 bg-black"></div>
            <div className="col-4">
                <div className="btn-group">
                    <h5>{props.name}</h5>
                    <div className="dropdown dropend">
                        <button type="button" className="btn btn-default btn-xsm dropdown-toggle" data-bs-toggle="dropdown">⋯</button>
                        <ul className="dropdown-menu">
                            <li><button onClick={() => handleReplacingExercise()} className="dropdown-item" >Replace Exericse</button></li>
                            <li><a className="dropdown-item" href="#">Weight Unit</a></li>
                            <li><button onClick={() => props.deleteExercise()}className="dropdown-item" >Remove Exercise</button></li>
                        </ul>
                    </div>   
                </div>
                <div>
                    <div className="row">
                        <div className="col input-group mb-3">
                            <span className="input-group-text">1</span>
                            <input className="form-control" type="number" placeholder="reps"></input>
                            <input className="form-control" type="number" placeholder="weight"></input>
                        </div>
                    </div>
                    {sets.map((set, index) => {
                        return(
                        <div key={`${set}${index}`} className="row">
                            <div className="col input-group mb-3">
                                <span className="input-group-text">{index + 2}</span>
                                <input className="form-control" type="number" placeholder="reps" id={index + 1}></input>
                                <input className="form-control" type="number" placeholder="weight" id={index + 1}></input>
                                <button onClick={() => handleDeleteSet(index)} className="btn btn-danger btn-sm">X</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <button onClick={() => handleSetSets()} className="btn btn-secondary btn-sm">Add Set</button>
            </div>
        </div>
    );
}
export default SessionExercise;