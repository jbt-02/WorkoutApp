import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

import { Link, useNavigate } from "react-router-dom";

import "./loginForm.css";

function LoginForm(){
    const [emailLog, setEmailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const[hasCookie, setHasCookie] = useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
      setHasCookie(Boolean(Cookies.get('uid')));
      if(Boolean(Cookies.get('uid'))){
          navigate('/userPage'); 
      }
    }, [hasCookie]);

    const login = () => {
        Axios.post('http://localhost:3001/login', {
        email: emailLog, 
        password: passwordLog
        }).then((response) => {

          if(response.data.length != 0){
            setLoginStatus('Success');
            Cookies.set('uid', response.data[0].uid, {expires: 1});
            navigate('/userPage'); 
          }else{
            setLoginStatus("Incorrect Login Info");
          }
          //console.log(response.data);
        });
    }
    
    return (
      <div className="container">
        <h3>Login</h3>
        <div className="loginForm row justify-content-center align-items-center">
          <form className="form-horizontal">
            <div className="form-outline mb-4 pt-5">
              <label className="form-label" for="email">Email:</label>
                <input type="text" 
                  name="email"
                  id="email"
                  className="form-control" 
                  onChange={(e) => {
                    setEmailLog(e.target.value);
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
                    setPasswordLog(e.target.value);
                  }} 
                />
            </div>   
          </form>
          <div className="text-center pt-5">
            <button className="btn btn-primary" id="loginBtn" onClick={login}>Login</button>
          </div>
          <div className="text-center">
            <Link to="/register">Don't have an Account? Register Here</Link> 
          </div> 
        </div>
        <div className="alert alert-danger">{loginStatus}</div>
      </div>
        
      );
}
export default LoginForm;