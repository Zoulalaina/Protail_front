import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import {FaSearch} from "react-icons/fa"
import logo from "../assets/logo.jpg"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const HeaderComponent2 = () =>{
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    
  const token = useSelector((state) => state.token);


    useEffect(()=>{
        getStatus();
        title();
    }, [])
    const getStatus = ()=>{
        
        EmployeeService.getStatus().then((response)=>{
            if(response.data.message=="login success"){
                console.log("ty")
                console.log(response.data)
                setMessage(response.data.message)
                

                
            } else{
                console.log("diso")
            }
            
        }).catch(error=>{
            console.log(error);
        })


    }

    const logout = ()=>{

        dispatch({ type: 'CLEAR_TOKEN'});
    
        


    }
    const title = ()=>{
        if(token!=null){
            return <Link to = "/" className="navbar-brand" onClick={logout}>Deconnexion </Link>  
        }else{
            return <div>
                          
                        <Link to = "/login" className="navbar-brand">Connexion</Link> 
                    
                    </div>
        }
    }



    return(
        <div className="App-header">
            <div className="logoApp">
            <img src={logo} alt="logo" className="logo"/>
            </div>
        
                <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <Link to = "/" className="navbar-brand">Accueil</Link>   
                    </div>
                    <Link to = "/" className="navbar-brand">Universités</Link>
                    <Link to = "/apropos" className="navbar-brand">Apropos</Link> 
                    <div>
                         
                        {
                            title()
                        }
                    
                    </div>
                
                </nav>
                </div>
            <div className="input-wapper">
                <FaSearch id="search-icon"/>
                <input placeholder="taper ici..." className="input-text"/>
            </div>
            
        </div>
    )
}
export default HeaderComponent2