import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MentionService from "../services/MentionService";
import ParcoursService from "../services/ParcoursService";
import UnivService from "../services/UnivService";
const SearchParcours=()=>{
    const [nomParcours, setNomParcours] = useState('');
  const [niveau, setNiveau] = useState('');
  const [langue, setLangue] = useState('');
  const [codition, setCodition] = useState('');
  const [cout, setCout] = useState('');
  const [bourse, setBourse] = useState('');
  const [capasite, setCapasite] = useState('');
  const [responsable, setResponsable] = useState('');
  const [idMention, setIdMention] = useState(2); // Université par défaut
    const[parcourss, setParcours]=useState([])
    const[nomMention, setNomMention]=useState('');
    const[nom, setNom]=useState('');
    const[nomUniversite, setNomUniversite]=useState('');
    const {id} = useParams();
    useEffect(()=>{
        
        getMention();
    }, [])
    const getMention=()=>{
        if(id){
        
        //GetByEtab
        ParcoursService.getParcoursById_id(id).then((response)=>{
            setNomParcours(response.data.nomParcours);
        setCapasite(response.data.capasite);
        setCodition(response.data.codition);
        setLangue(response.data.langue);
        setCout(response.data.cout);
        setBourse(response.data.bourse);
        setNiveau(response.data.niveau);
        setResponsable(response.data.responsable);
      setIdMention(response.data.mention.idMention)
      setNomMention(response.data.mention.nomMention);
      setNom(response.data.mention.etablissement.nom);
      setNomUniversite(response.data.mention.etablissement.universite.nomUniversite);
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })
    }

    }

    return(
        <div>
            <div className="container">
                
                <div className="row">
                    
                        
                            <div className="col-sm">
                            
                            
                           
                            
                        
                            <a> <u> <b> Nom parcours :</b> </u>  {nomParcours}</a><br/>
                            <a> <u> <b> Niveau :</b> </u>  {niveau}</a><br/>
                            <a> <u> <b> Condition et modalité d'accès  :</b> </u>  {codition}</a><br/>
                            <a> <u> <b> Langue utilisé :</b> </u>  {langue}</a><br/>
                            <a> <u> <b> Droit d'inscription :</b> </u>  {cout}</a><br/>
                            <a> <u> <b> Bourse :</b> </u>  {bourse}</a><br/>
                            <a> <u> <b> Capasité d'accueil :</b> </u>  {capasite}</a><br/>
                            <a> <u> <b> Responsable :</b> </u>  {responsable}</a><br/>
                            <a> <u> <b> Mention :</b> </u>  {nomMention}</a><br/>
                            <a> <u> <b> Etablissement :</b> </u>  {nom}</a><br/>
                            <a> <u> <b> Université :</b> </u>  {nomUniversite}</a><br/>

                    
                            
                            </div>
                            
                        
                            
               
                    
                        
                            
                         

                        
                    
                </div>
                

            </div>
        </div>
    );

}
export default SearchParcours