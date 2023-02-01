import React, { useState } from 'react';
import Day from "./days";

function WeekCalendar(props) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    
    const[date, setDate] = useState(new Date());
    const [week, setWeek] = useState([]);

    React.useEffect(() => {
      const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const endOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - date.getDay()));
      const days = [];
      let currentDay = startOfWeek;
  
      while (currentDay <= endOfWeek) {
        days.push(currentDay);
        currentDay = new Date(currentDay.getTime() + 86400000);
      }
  
      setWeek(days);
    }, [date]);

    return (
      <ul className="nav nav-pills">
        {week ? week.map((day, index) => (
          <Day id={index} date={day.getDate()} day={days[index]}/>
        )) : <p>Loading...</p>}
      </ul>
    );
  }
  export default WeekCalendar;