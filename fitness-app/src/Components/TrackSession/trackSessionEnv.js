import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Cookies from 'js-cookie';

import SearchBar from '../common/searchBar';
import SessionExercise from '../common/sessionExercise';

import '../common/css/sessionBuildEnv.style.css';

function TrackSessionEnv(props){
    const [templateJSON, setTemplateJSON] = useState(JSON.parse(props.sessionTemplate))
    const [title, setTitle] = useState(templateJSON.name);
    const [goal, setGoal] = useState(templateJSON.goal);
    const [exerciseListEnv, setExerciseListEnv] = useState(false);
    const [exerciseList, setExerciseList] = useState({}); 
    const [searchBarQuery, setSearchBarQuery] = useState('');
    const [exerciseSelected, setExerciseSelected] = useState({});
    const [workoutExerciseList, setWorkoutExerciseList] = useState(templateJSON.Exercises);
    const [isReplacingExercise, setIsReplacingExercise] = useState({
        isReplace: false,
        oldExercise: null
    });
    const [submitModal, setSubmitModal] = useState(false);
    const [sessionSets, setSessionSets] = useState([]);

    const [sessionJSON, setSessionJSON] = useState({
        uid: Cookies.get('uid'),
        name : title,
        goal : goal,
        Exercises: [],
        Sets: []
    });
    const [submitStatus, setSubmitStatus] = useState(false);
    const navigate = useNavigate();

    const submitTemplate = () => {
        Axios.post('http://localhost:3001/submitTemplate', {
        uid: sessionJSON["uid"],
        sessionJSON: sessionJSON
        }).then((response) => {
          if(response.data.length != 0){
            setSubmitStatus(true);
            navigate('/userPage'); 
          }else{
            setSubmitStatus(false);
          }
          //console.log(response.data);
        });
    }

    const handleSessionSets = (id, setData) => {
        if(id - 1 > sessionSets.length){
            setSessionSets([...sessionSets, setData]);
        }else{
            const updatedSetsArr = [...sessionSets];
            updatedSetsArr[id - 1] = setData;
            setSessionSets(updatedSetsArr);
        }
    }

    const handleSessionJSON = () => {
        workoutExerciseList.map((obj, index) => {
            setSessionJSON(prevJSON => ({
                ...prevJSON,
                Exercises: [...prevJSON.Exercises, {
                    index: index,
                    eid: obj.props.eid,
                    name: obj.props.exercise_name,
                }],
                Sets: sessionSets
            }));
        });
        setSubmitModal(false);
        setSubmitStatus(true);
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
        const newExercise = (
            <SessionExercise 
            key={workoutExerciseList.length + 1} 
            eid={Object.values(exerciseSelected)[0]} 
            exercise_name={Object.values(exerciseSelected)[1]}
            />
        );
        
        if(isReplacingExercise.isReplace){
            handleReplaceExercise(isReplacingExercise.oldExercise, newExercise);
            setIsReplacingExercise({isReplace: false, oldExercise: null});
        } else {
            setWorkoutExerciseList([
                ...workoutExerciseList, newExercise
            ]);    
        }
        setExerciseListEnv(false);
    }

    const handleDeleteExercise = (index) => {
        setWorkoutExerciseList(workoutExerciseList.filter((exercise, i) => i !== index));
        setSessionSets(sessionSets.filter((exercise, i) => i !== index));
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

    useEffect(() => {
        if(submitStatus){
            submitTemplate();
            navigate('/userPage'); 
        }
    }, [submitStatus]);

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
                            eid={(obj.eid) ? obj.eid : obj.props.eid}
                            name={(obj.name) ? obj.name : obj.props.exercise_name}
                            deleteExercise={() => handleDeleteExercise(index)}
                            setExerciseList={() => handleSetExerciseListEnv()}
                            setIsReplacingExercise={() => setIsReplacingExercise({ isReplace: true, oldExercise: index })}
                            onSetChange={handleSessionSets}
                            initialSets={templateJSON.Sets[index]}
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
                                        <p className="lead">Do you want to save this as a new Template?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button className="btn btn-primary" onClick={() => handleSessionJSON()} data-bs-dismiss="modal">Save as New Template</button>
                                        <button className="btn btn-primary" onClick={() => handleSessionJSON()} data-bs-dismiss="modal">No</button>
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

export default TrackSessionEnv;
