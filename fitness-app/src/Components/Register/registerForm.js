import { useState } from 'react';
import Axios from 'axios';

import "./registerForm.css";

import { Outlet, Link } from "react-router-dom";

function RegisterForm(){
    const [emailReg, setEmailReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        Axios.post('http://localhost:3001/register', 
        {email: emailReg, 
        password: passwordReg
        }).then((response) => {
            console.log(response);
        });
    }

    return (
      <div className="container">
        <h3>Register</h3>
        <div className="RegisterForm row justify-content-center align-items-center">
          <form className="form-horizontal">
            <div className="form-outline mb-4 pt-5">
              <label className="form-label" for="email">Email:</label>
                <input type="text" 
                  name="email"
                  id="email"
                  className="form-control" 
                  onChange= {(e) => {
                    setEmailReg(e.target.value);
                  }} 
                />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" for="password">Password:</label>
                <input type="text" 
                  name="password"
                  id="password"
                  className="form-control"  
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }} 
                />
            </div>
            <div className="text-center pt-5">
              <button className="btn btn-primary" id="registerBtn" onClick={register}>Register</button>
            </div>
            <div className="text-center">
              <Link to="/login">Click here if you already have an account</Link>
            </div>
          </form>
        </div>
      </div>
        
      );
}
export default RegisterForm;