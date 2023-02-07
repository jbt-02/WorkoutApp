function SessionExercise(props){
    return(
        <div className="container row" id={props.eid}>
            <div className="col-1">
                {props.index}
            </div>
            <div className="col-1 bg-black"></div>
            <div className="col-5">{props.name}</div>
        </div>
    );
}
export default SessionExercise;