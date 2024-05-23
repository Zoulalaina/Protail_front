// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/connexion", { username, password });
      // Save JWT token from response to local storage
      const token =response.data.bearer;
      dispatch({ type: 'SET_TOKEN', payload: token });
      sessionStorage.setItem("token",response.data.bearer);
      // Redirect to profile page or other authorized routes
      navigate("/home");
      console.log(response.data.bearer);
      console.log(sessionStorage.getItem("token"));
      // ...
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
        <h2 className='text-center'>Connexion</h2>
        <div className="card-body">   
        <div className="form-group mb-2">   
      <input
        type="text"
        placeholder="Entrez votre email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className = "form-control"
      />
      </div>
      <div className="form-group mb-2">   
      <input
        type="password"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className = "form-control"
      />
      </div>
      <button onClick={handleLogin} className = "btn btn-primary">Connexion</button>
      <Link to="/register">Vous n'avez pas du compte?</Link>
      </div>

      </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
