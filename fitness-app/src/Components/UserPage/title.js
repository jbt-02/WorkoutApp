function Title(props) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();

let date = {
  month: months[d.getMonth()],
  day: days[d.getDay()],
  date: d.getDate()
}


  return (
    <div className="Container">
      <h3>{date.day}, {date.date} {date.month}</h3>
      <h1>Hello {props.email}!</h1>
    </div>
  );
}

export default Title;