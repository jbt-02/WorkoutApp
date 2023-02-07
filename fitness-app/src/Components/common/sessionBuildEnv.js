import { useState } from 'react';
import Axios from 'axios';

import SearchBar from './searchBar';
import SessionExercise from './css/sessionExercise';

import './css/sessionBuildEnv.style.css';

function SessionBuildEnv(){
    const [title, setTitle] = useState("");
    const [exerciseListEnv, setExerciseListEnv] = useState(false);
    const [exerciseList, setExerciseList] = useState({}); 
    const [exerciseSelected, setExerciseSelected] = useState({});
    const [workoutExerciseList, setWorkoutExerciseList] = useState([]);

    const handleSetExerciseListEnv = () =>{
        setExerciseListEnv(true);
        grabExercises();
    }

    const handleSetWorkoutExerciseList = () =>{
        console.log(Object.values(exerciseSelected));
        const eid = Object.values(exerciseSelected)[0];
        const name = Object.values(exerciseSelected)[1];
        setWorkoutExerciseList([
            ...workoutExerciseList, {eid : eid, name : name}
        ]);
        console.log(workoutExerciseList);

        setExerciseListEnv(false);    
    }

    const grabExercises = () => {
        Axios.post('http://localhost:3001/createSession').then((response) => {
          if(response.data.length != 0){
            setExerciseList(response.data);
          }else{
            console.log("ERROR");
          }
        });
    }

    return(
        <>
            <div style = {{display: exerciseListEnv ? "none" : "block"}} className="container-fluid text-center pb-4" id="sessionEnv">
                <input onChange={(e) => {setTitle(e.target.value)}} placeholder="Title"></input>
                <h6 className="pt-3">Day 1</h6>
                <div className="form-group row pb-3">
                    <textarea className="form-control col-sm-6 textarea" rows="10" placeholder="Warmup"></textarea>
                </div>
                {workoutExerciseList ? Object.values(workoutExerciseList).map((obj, index) => (
                        <SessionExercise 
                        index={index + 1}
                        eid={obj.eid}
                        name={obj.name}
                        />
                    )) : <p>Loading...</p>}
                <button className="btn btn-default" onClick={() =>{handleSetExerciseListEnv()}} id="addExercise">Add Exercise</button>            
            </div>
            <div style={{display: exerciseListEnv ? "block" : "none"}} className="container-fluid text-center pt-4 pb-4" id="sessionEnv">
                <SearchBar/>
                <ul className="list-group">
                    {exerciseList ? Object.values(exerciseList).map((obj) => (
                        <li 
                            className={`list-group-item ${exerciseSelected.eid === obj.eid ? 'active' : ''}`} 
                            id={obj.eid}
                            onClick={()=>setExerciseSelected(obj)}
                        >{obj.name}
                        </li>
                    )) : <p>Loading...</p>}
                </ul>  
                <button 
                    style={{display : Object.entries(exerciseSelected).length === 0 ? 'none' : 'block'}} 
                    onClick={() => handleSetWorkoutExerciseList()}
                    className="btn btn-outline-secondary">
                    Add exercise
                </button>  
            </div>
        </>
        
    );
}

export default SessionBuildEnv;