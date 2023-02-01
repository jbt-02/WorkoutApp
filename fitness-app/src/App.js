import { BrowserRouter ,Routes, Route} from "react-router-dom";

import LoginPage from "./Pages/login.page";
import RegisterPage from "./Pages/register.page";
import LandingPage from "./Pages/landing.page";
import UserPage from "./Pages/userPage.page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path = "/" element = {<LandingPage />} />
        <Route path = "/register" element = {<RegisterPage />} />
        <Route path = "/login" element = {<LoginPage />} />
        <Route path = "/userPage" element = {<UserPage />} />
      </Routes>
    </BrowserRouter>
      
  );
}

export default App;
