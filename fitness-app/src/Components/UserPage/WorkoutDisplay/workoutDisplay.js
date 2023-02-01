import { useState } from 'react';

function WorkoutDisplay(props) {
    const [hasWorkout, setHasWorkout] = useState(false);
  
    return (
      <div className="Container">
        <h4>Today's Workout</h4>
        {hasWorkout ? (<p>Replace with actual workout</p>) : (<p className="text-secondary">You have no workouts today</p>)}
      </div>
    );
  }
  
  export default WorkoutDisplay;