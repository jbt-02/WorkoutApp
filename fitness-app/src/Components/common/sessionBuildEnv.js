import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import SearchBar from './searchBar';
import SessionExercise from './sessionExercise';

import './css/sessionBuildEnv.style.css';

function SessionBuildEnv(props){
    const [title, setTitle] = useState(props.name);
    const [goal, setGoal] = useState(props.goal);
    const [exerciseListEnv, setExerciseListEnv] = useState(false);
    const [exerciseList, setExerciseList] = useState({}); 
    const [searchBarQuery, setSearchBarQuery] = useState('');
    const [exerciseSelected, setExerciseSelected] = useState({});
    const [workoutExerciseList, setWorkoutExerciseList] = useState([]);
    const [isReplacingExercise, setIsReplacingExercise] = useState({
        isReplace: false,
        oldExercise: null
    });
    const [submitModal, setSubmitModal] = useState(false);
    const [sessionJSON, setSessionJSON] = useState({
        uid: Cookies.get('uid'),
        name : title,
        goal : goal,
        Exercises: []
    });
    
    const handleSessionJSON = () => {
        workoutExerciseList.map((obj, index) => {
            setSessionJSON(prevJSON => ({
                ...prevJSON,
                Exercises: [...prevJSON.Exercises, {
                    index: index,
                    eid: obj.props.eid,
                    name: obj.props.exercise_name
                }]
            }));
        });
        setSubmitModal(false);
    }

    const filteredExercises = Object.values(exerciseList).filter(item => 
        item.name.toLowerCase().includes(searchBarQuery.toLowerCase())
    );

    const handleSetExerciseListEnv = (setExerciseList) =>{
        if(!setExerciseList){
            setExerciseListEnv(false);    
        }
        setExerciseListEnv(true);

        if(Object.keys(exerciseList).length === 0){
            grabExercises();
        }
    }

    const handleSetWorkoutExerciseList = () =>{
        console.log(isReplacingExercise);

        const newExercise = (
            <SessionExercise key={workoutExerciseList.length + 1} eid={Object.values(exerciseSelected)[0]} exercise_name={Object.values(exerciseSelected)[1]}/>
        );
        
        if(isReplacingExercise.isReplace){
            handleReplaceExercise(isReplacingExercise.oldExercise, newExercise);
            console.log("replace");
            setIsReplacingExercise({isReplace: false, oldExercise: null});
        } else {
            setWorkoutExerciseList([
                ...workoutExerciseList, newExercise
            ]);
            
            console.log(workoutExerciseList);    
        }
        setExerciseListEnv(false);
    }

    const handleDeleteExercise = (index) => {
        setWorkoutExerciseList(workoutExerciseList.filter((exercise, i) => i !== index));
    }

    const handleReplaceExercise = (index, newExercise) => {
        const newExercises = [...workoutExerciseList];
        newExercises[index] = newExercise;
        setWorkoutExerciseList(newExercises);
    }

    const grabExercises = () => {
        Axios.post('http://localhost:3001/createSession').then((response) => {
          if(response.data.length !== 0){
            setExerciseList(response.data);
          } else {
            console.log("ERROR");
          }
        });
    }

    return (
        <>
            <div style={{ display: exerciseListEnv ? "none" : "block" }} className="container-fluid text-center pb-4" id="sessionEnv">
                <div className="row">
                    <h6 className="col-11 pt-3">Day 1</h6>
                    <button className="col-1 btn btn-primary" onClick={()=>setSubmitModal(true)}>Done</button>
                </div>
                
                <div className="form-group row pb-3">
                    <textarea className="form-control col-sm-6 textarea" rows="10" placeholder="Warmup"></textarea>
                </div>
                    {workoutExerciseList ? workoutExerciseList.map((obj, index) => (
                        <SessionExercise
                            key={`Exercise-${index}`} 
                            index={index + 1}
                            eid={obj.props.eid}
                            name={obj.props.exercise_name}
                            deleteExercise={() => handleDeleteExercise(index)}
                            setExerciseList={() => handleSetExerciseListEnv()}
                            setIsReplacingExercise={() => setIsReplacingExercise({ isReplace: true, oldExercise: index })}
                        />
                    )) : <p>Loading...</p>}
                    {submitModal && (
                        <div className="modal" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">                  
                                    <div className="modal-header">
                                        <h4 className="modal-title">Submit Workout Template</h4>
                                        <button type="button" className="btn-close" onClick={()=>setSubmitModal(false)}data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p className="lead">Are you sure you want to save and submit this template?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button className="btn btn-primary" onClick={() => handleSessionJSON()} data-bs-dismiss="modal">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}                
                <button className="btn btn-default" onClick={() => { handleSetExerciseListEnv() }} id="addExercise">Add Exercise</button>            
            </div>
            <div style={{ display: exerciseListEnv ? "block" : "none" }} className="container-fluid text-center pt-4 pb-4" id="sessionEnv">
                <SearchBar query={searchBarQuery} setQuery={setSearchBarQuery}/>
                <ul className="list-group">
                    {exerciseList ? Object.values(filteredExercises).map((obj, index) => (
                        <li 
                            key={`preSet-${index}`}
                            className={`list-group-item ${exerciseSelected.eid === obj.eid ? 'active' : ''}`} 
                            id={obj.eid}
                            onClick={() => setExerciseSelected(obj)}
                        >{obj.name}
                        </li>
                    )) : <p>Loading...</p>}
                </ul>  
                <button 
                    style={{ display : Object.entries(exerciseSelected).length === 0 ? 'none' : 'block' }} 
                    onClick={() => handleSetWorkoutExerciseList()}
                    className="btn btn-outline-secondary">
                    Add exercise
                </button>  
            </div>
        </>
    );
}

export default SessionBuildEnv;
