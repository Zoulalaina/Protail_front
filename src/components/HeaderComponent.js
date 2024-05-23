import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import {FaSearch} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const HeaderComponent = () =>{
    const [message, setMessage] = useState("")
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
 

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
            return <Link to = "/" className="navbar-brand" onClick={logout}>Deconnexion</Link>   
        }else{
            return <div>
                           
                        <Link to = "/login" className="navbar-brand">Connexion</Link> 
                    
                    </div>
        }
    }
    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/parcours")
        .then((response) => response.json())
        .then((json => {
            const results = json.filter((parcours)  =>{
                return value && parcours && parcours.nomParcours && parcours.nomParcours.toLowerCase().includes(value)
            });
            setResultat(results);
            console.log(results);
        }))
    }
    const handleChange = (value) =>{
        SetInput(value)
        fechData(value)
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
                <input placeholder="taper ici..." className="input-text" value={input} onChange={(e) => handleChange(e.target.value)}/>
                <div className="results-list">
                    {
                        resultat.map((result, id)=>{
                            return <div key = {id}>
                            <Link to={"/parcours/"+result.idParcours}>
                                
                                {result.nomParcours}
                                </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        
        </div>
    )
}
export default HeaderComponent