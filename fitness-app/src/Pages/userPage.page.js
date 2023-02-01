import React, { useState, useEffect } from 'react';
import Title from "../Components/UserPage/title";
import Cookies from 'js-cookie';
import Axios from 'axios';

import NavBar from '../Components/common/nav';
import WeekCalendar from '../Components/UserPage/Calendar/weekCalendar';
import WorkoutDisplay from '../Components/UserPage/WorkoutDisplay/workoutDisplay';

function UserPage() {
    const [email, setEmail] = useState('');

    const uid = Cookies.get('uid');

    useEffect(() => {
        Axios.post('http://localhost:3001/userPage', {
            uid: uid
        }).then((response) => {
            try{
                setEmail(response.data[0].email);
                console.log("Success");
            }catch{
                console.log(response);
            }
        });
    });

    return (
        <>
            <NavBar/>
            <div className="Container pt-5">
                <Title email={email} />
            </div>
            <div className="text-center pt-5">
                <WeekCalendar/>
            </div>
            <div className="pt-5">
                <WorkoutDisplay/>
            </div>
            
        </>
        
    );
}

export default UserPage;