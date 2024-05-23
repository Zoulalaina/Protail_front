import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import {FaSearch} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { FiLogOut } from 'react-icons/fi';

const HeaderAdmin = () =>{
    const logout=()=>{
        sessionStorage.removeItem("token");

    }

    return(
        

        <div className="App-header">
            <div className="logoApp">
            <img src={logo} alt="logo" className="logo"/>
            </div>
        
        
                <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    
                    <Link to = "/admin" className="navbar-brand">Universités</Link> 
                    
                    <Link to = "/faculte" className="navbar-brand">Faculté</Link> 
                    <Link to = "/ecole" className="navbar-brand">Ecole</Link> 
                    <Link to = "/institut" className="navbar-brand">Institut</Link>
                    <Link to = "/mention" className="navbar-brand">Mention</Link> 
                    <Link to = "/parcours" className="navbar-brand">Parcours</Link> 
                      


                    
                
                    

                </nav>
                </div>
                <div>
                <Link to = "/" className="navbar-brand" onClick={logout}><FiLogOut/></Link> 
                </div>
            
        
        </div>
    )
}
export default HeaderAdmin