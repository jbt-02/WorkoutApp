import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import NavBar from '../Components/common/nav';
import SessionsTable from '../Components/MySession/sessionsTable';
import SearchBar from '../Components/common/searchBar';

import './css/modal.css';

function MySessionPage() {
    const [show, setShow] = useState(false);

    const [sessionMetaData, setSessionMetaData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
    
        localStorage.setItem('sessionMetaData', JSON.stringify(sessionMetaData));
    
        navigate('/createSession');
      };

    const handleChange = event => {
        setSessionMetaData({
          ...sessionMetaData,
          [event.target.name]: event.target.value
        });
      };

    return (
        <>
            <NavBar/>
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col">
                        <h3>My Sessions</h3>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button onClick={handleShow} type="button" className="btn btn-primary">Create Session</button>
                    </div>
                </div>
                {show && (
                    <div className="modal show" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">New Session</h5>
                          <button type="button" className="btn close" onClick={handleClose}>
                            <span>&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div class="mb-3 mt-3">
                                <label className="form-label text-secondary">Session Name:</label>
                                <input
                                name="name" 
                                className="form-control"
                                onChange={handleChange}
                                />
                            </div>
                            <div class="mb-3 mt-3">
                                <label className="form-label text-secondary">Description:</label>
                                <input
                                name="desc" 
                                className="form-control"
                                onChange={handleChange}
                                />
                            </div>
                            <div class="mb-3 mt-3">
                                <label className="form-label text-secondary">Goal:</label>
                                <input
                                name="goal" 
                                className="form-control"
                                onChange={handleChange}
                                />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer justify-content-center">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                          <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="pt-5">
                    <SearchBar/>
                    <SessionsTable/>
                </div>
            </div>
            
        </>
        
    );
}

export default MySessionPage;