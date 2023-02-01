import { Outlet, Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="Container text-center">
      <h1>LANDING PAGE</h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Landing Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default LandingPage;