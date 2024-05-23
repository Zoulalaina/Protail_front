import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AvisService from "../services/AvisService";
import EtablissementService from "../services/EtablissementService";
import UnivService from "../services/UnivService";
import { useSelector } from 'react-redux';
import { FaPaperPlane} from "react-icons/fa";

const Description=()=>{
    const[universites, setUniversites]=useState("")
    const[message, setMessage]=useState("")
    const [idUniversite, setIdUniversite] = useState(); 
    const[etablissements, setEtablissement]=useState([])
    const[avis, setAvis]=useState([])
    const {id} = useParams();
    const token = useSelector((state) => state.token);

    useEffect(()=>{
        getUniversite();
    }, [])
    const getUniversite=()=>{
        if(id){
        setIdUniversite(id)
        UnivService.getUnivById2(id).then((response)=>{
            setUniversites(response.data)
            
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
        EtablissementService.getEtabByUniv2(id).then((response)=>{
            setEtablissement(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
        AvisService.getAvisById(id).then((response)=>{
            setAvis(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
    }

    }
    async function saveAvis(e){
        e.preventDefault();

        const avis={
            message,
            universite: {
                idUniversite,
              },
        }
        console.log("ty no izy");
        console.log(token);
        
        console.log(avis);

        const response = await fetch("http://localhost:8080/api/v1/avis", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(avis),
      });
  
      console.log(sessionStorage.getItem("token")); 
      getUniversite()
    }

    return(
        <div>
            <div className="container">
                <h1 className="text-center"><a>{universites.nomUniversite}</a><br/></h1>
                <div className="row">
                    
                        
                            
                            <div className="col-sm">
                           
    
                            <img src={'data:image/png;base64,'+universites.image} style={{width:'100%', height:'100%'}} alt="univ"></img><br/>
                            
                            
                            

                            </div>
                            <div className="col-sm">
                            <a>{universites.historique}</a>
                            <a>{universites.siegeUniversite}</a>

                            </div>

                        
                    
                </div>


                <div className="row" style={{margin: 20,background:"azure"}}>
                <h2 className="text-center">Listes des établissements</h2>
                        {etablissements.map(etablissement=>(
                            <div className="col-lg-4">
                            
                           
                            <Link to={"/etab/"+etablissement.idEtab} className="text-center">
                        
                            <a className="form-control" >{etablissement.nom}</a><br/>
                    
                            </Link>
                            </div>
                            
                        )
                            )}
                </div>
                <div>

                    {
                        avis.map(avi=>(
                            <div className="border">
                            <a><b>{avi.user.email}</b></a><br/>
                            <a>{avi.message}</a>
                            </div>
                        ))
                    }
                </div>
                

                <h2 className="form-label">Ajouter votre avis par rapport à {universites.nomUniversite}</h2>
                <div className="flex">
                    
                    <div>
                    
                    <input
                    type="text"
                    placeholder="Ajouter votre avis"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control"/>
                    </div>
                    <div>
                    <button onClick={saveAvis}><FaPaperPlane/></button>
                    </div>
                </div>
                

            </div>
        </div>
    );

}
export default Description