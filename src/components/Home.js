import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UnivService from "../services/UnivService";
const Home=()=>{
    const[universites, setUniversites]=useState([])
    useEffect(()=>{
        getAllUniversite();
    }, [])
    const getAllUniversite=()=>{
        UnivService.getAllUniv2().then((response)=>{
            setUniversites(response.data)
            console.log(response.data);
            console.log(sessionStorage.getItem("token"));

        }).catch(error =>{
            console.log(error);
        })

    }

    return(
        <div>
            <div className="container">
                <h1 className="text-center">Les universités publiques malagasy</h1>
                <div className="liste">
                    
                        {universites.map(universite=>(
                            
                            <div className="univ">
                           
                            <Link to={"/univ/"+universite.idUniversite}>
                            <img src={'data:image/png;base64,'+universite.image} style={{width:'350px', height:'200px'}} alt="univ"></img><br/>
                            <a>{universite.nomUniversite}</a><br/>
                            <a>{universite.siegeUniversite}</a>
                            </Link>
                            </div>
                        )
                            )}
                    
                </div>
            </div>
        </div>
    );

}
export default Home