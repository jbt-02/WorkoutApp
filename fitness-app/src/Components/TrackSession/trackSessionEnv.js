import {React, useState} from "react";

import '../common/css/sessionBuildEnv.style.css';
import SessionExercise from "../common/sessionExercise";

function TrackSessionEnv(props){
    const [rid, setRID] = useState(props.rid);
    const [templateJSON, setTemplateJSON] = useState(JSON.parse(props.sessionTemplate));
    const[sessionName, setSessionName] = useState(templateJSON.name);
    const[exercises, setExercises] = useState(templateJSON.Exercises);
    const[sets, setSets] = useState(templateJSON.Sets);
    const[goal, setGoal] = useState(templateJSON.goal);
    const [searchBarQuery, setSearchBarQuery] = useState('');
    const [exerciseSelected, setExerciseSelected] = useState({});
    const [isReplacingExercise, setIsReplacingExercise] = useState({
        isReplace: false,
        oldExercise: null
    });

    const handleSessionSets = (id, setData) => {
        if(id - 1 > sets.length){
            setSets([...sets, setData]);
        }else{
            const updatedSetsArr = [...sets];
            updatedSetsArr[id - 1] = setData;
            setSets(updatedSetsArr);
        }
    }

    const handleSetWorkoutExerciseList = () =>{
        const newExercise = (
            <SessionExercise 
            key={exercises.length + 1} 
            eid={Object.values(exerciseSelected)[0]} 
            exercise_name={Object.values(exerciseSelected)[1]}
            />
        );
        
        if(isReplacingExercise.isReplace){
            handleReplaceExercise(isReplacingExercise.oldExercise, newExercise);
            setIsReplacingExercise({isReplace: false, oldExercise: null});
        } else {
            setExercises([
                ...exercises, newExercise
            ]);    
        }
        //setExerciseListEnv(false);
    }
    
    const handleDeleteExercise = (index) => {
        setExercises(exercises.filter((exercise, i) => i !== index));
        setSets(sets.filter((exercise, i) => i !== index));
    }
    
    
    const handleReplaceExercise = (index, newExercise) => {
        const newExercises = [...exercises];
        newExercises[index] = newExercise;
        setExercises(newExercises);
    }
    
    return(
        <div className="container-fluid pb-4" id="sessionEnv">
            <div className="row text-center">
                <div className="col-1">
                    <h2>{sessionName}</h2>
                </div>
                <div className = "col-2 pt-2">
                    <h6>Day 1</h6>
                </div>
            </div>
            <div className="col">Goal: {goal}</div>
            <div className="form-group row pb-3">
                <textarea className="form-control col-sm-6 textarea" rows="10" placeholder="Warmup"></textarea>
            </div>
            {console.log(templateJSON)}
            {exercises ? exercises.map((obj, index) => (
                <SessionExercise
                    key={`Exercise-${index}`}
                    index={index + 1}
                    eid={obj.eid}
                    name={obj.name}
                    deleteExercise={() => handleDeleteExercise(index)}
                    //setExerciseList={() => handleSetExerciseListEnv()}
                    setIsReplacingExercise={() => setIsReplacingExercise({ isReplace: true, oldExercise: index })}
                    onSetChange={handleSessionSets}
                    initialSets={sets[index]}
                />
            )) : <p>Loading...</p>}
            
        </div>
    );
}
export default TrackSessionEnv;
