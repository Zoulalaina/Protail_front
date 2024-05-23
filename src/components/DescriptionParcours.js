import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MentionService from "../services/MentionService";
import ParcoursService from "../services/ParcoursService";
import UnivService from "../services/UnivService";
const DescriptionParcours=()=>{
    const[mentions, setMentions]=useState("")
    const[parcourss, setParcours]=useState([])
    const {id} = useParams();
    useEffect(()=>{
        getMention();
    }, [])
    const getMention=()=>{
        if(id){
        MentionService.getMentionById2(id).then((response)=>{
            setMentions(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
        //GetByEtab
        ParcoursService.getParcoursById2(id).then((response)=>{
            setParcours(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
    }

    }

    return(
        <div>
            <div className="container">
                <h1 className="text-center"><a>{mentions.nomMention}</a><br/></h1>
                <div className="row">
                    
                        {parcourss.map(parcours=>(
                            <div className="col-sm">
                            
                            
                           
                            
                        
                            <a> <u> <b> Nom parcours :</b> </u>  {parcours.nomParcours}</a><br/>
                            <a> <u> <b> Niveau :</b> </u>  {parcours.niveau}</a><br/>
                            <a> <u> <b> Condition et modalité d'accès  :</b> </u>  {parcours.codition}</a><br/>
                            <a> <u> <b> Langue utilisé :</b> </u>  {parcours.langue}</a><br/>
                            <a> <u> <b> Droit d'inscription :</b> </u>  {parcours.cout}</a><br/>
                            <a> <u> <b> Bourse :</b> </u>  {parcours.bourse}</a><br/>
                            <a> <u> <b> Capasité d'accueil :</b> </u>  {parcours.capasite}</a><br/>
                            <a> <u> <b> Responsable :</b> </u>  {parcours.responsable}</a><br/>
                    
                            
                            </div>
                            
                        )
                            )}
               
                    
                        
                            
                         

                        
                    
                </div>
                

            </div>
        </div>
    );

}
export default DescriptionParcours