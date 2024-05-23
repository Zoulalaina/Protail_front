import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import EtablissementService from "../services/EtablissementService";
import MentionService from "../services/MentionService";
import UnivService from "../services/UnivService";


const DescriptionMention=()=>{
    const[etablissements, setEtablissements]=useState("")
    const[mentions, setMention]=useState([])
    const {id} = useParams();
    useEffect(()=>{
        getEtablissement();
    }, [])
    const getEtablissement=()=>{
        if(id){
        EtablissementService.getById2(id).then((response)=>{
            setEtablissements(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
        //GetByEtab
        MentionService.getMentionByEtab2(id).then((response)=>{
            setMention(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
    }

    }

    return(
        <div>
            <div className="container">
                <h1 className="text-center"><a>{etablissements.nom}</a><br/></h1>
                <div className="row">
                    
                        {mentions.map(mention=>(
                            <div className="col-lg-4">
                            
                            
                           
                            
                        
                            <h5>{mention.nomMention}</h5>
                    
                            
                            <a> <u> <b> Responsable :</b> </u>  {mention.responsable}</a><br/>
                            <Link to={"/mention/"+mention.idMention}>
                            <button className="btn btn-primary"> Voir les parcours </button>
                            </Link>
                            </div>
                            
                        )
                            )}
               
                    
                        
                            
                         

                        
                    
                </div>
                

            </div>
        </div>
    );

}
export default DescriptionMention