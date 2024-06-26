import { useState, useEffect } from 'react';

function SessionExercise(props, eid_num, exercise_name){
    const [eid, setEid] = useState(eid_num);
    const [name, setName] = useState(exercise_name);
    const [sets, setSets] = useState([{id: 0, reps: 0, weight: 0}]);
    const[setDeleted, setSetDeleted] = useState(false);
    
    const handleSetSets = () => {
        setSets([...sets, {id: sets.length, reps: 0, weight: 0}]);
    };

    const handleDeleteSet = (index) => {
        setSets(sets.filter(set => set.id !== index));
        setSetDeleted(true);
    }

    const handleSetReps = (id, val) => {
        const updatedSets = sets.map(set => {
            if(set.id == id){
                return {...set, ...val};
            }
            return set;
        });
        
        setSets(updatedSets);
    }

    const handleSetWeight = (id, val) => {
        const updatedSets = sets.map(set => {
            if(set.id == id){
                return {...set, ...val};
            }
            return set;
        });
        
        setSets(updatedSets);
    }

    const handleReplacingExercise = () => {
        props.setIsReplacingExercise();
        props.setExerciseList(true);
    }

    useEffect(() => {
        if(setDeleted){
            const updateSetId = sets.map((set, index) => {
                set.id = index;
                return set;
            });

            setSets(updateSetId);
            setSetDeleted(false);
        }
        

    }, [sets]);

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
                            <li><button onClick={() => props.adjustExerciseModalVisible()}className="dropdown-item" >Adjust Exercises</button></li>
                        </ul>
                    </div>   
                </div>
                <div>
                    {sets.map((set, index) => {
                        return(
                        <div key={`${set}${index}`} id ={`${index}`}className="row">
                            <div className="col input-group mb-3">
                                <span className="input-group-text">{index + 1}</span>
                                <input className="form-control" type="number" value={(set.reps != 0) ? set.reps : ""} onChange={(e) => handleSetReps(index, {reps: parseInt(e.target.value)}) } placeholder="reps" id={index + 1}></input>
                                <input className="form-control" type="number" value={(set.weight != 0) ? set.weight : ""} onChange={(e) => handleSetWeight(index, {weight: parseInt(e.target.value)})} placeholder="weight" id={index + 1}></input>
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