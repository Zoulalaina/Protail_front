import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import MentionService from "../services/MentionService";


const ListeMention=()=>{
    const[mentions, setMention]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllMention();
    }, [])
    const getAllMention=()=>{
        MentionService.getAllMention().then((response)=>{
            setMention(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })


    }

    const deleteMention=(mentionId)=>{
        MentionService.deleteMention(mentionId).then((response)=>{
            getAllMention();
        }).catch(error=>{
            console.log(error);
        })

    }

    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/mention/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
        .then((response) => response.json())
        .then((json => {
            const results = json.filter((parcours)  =>{
                return value && parcours && parcours.nomMention && parcours.nomMention.toLowerCase().includes(value)
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
        <div className="container">
            <h2 className="text-center"> Liste des Mentions</h2>
            <div className="recherche">
            <div>
            <Link to ="/admin/add-mention" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id mention</th>
                    <th> Nom mention</th>
                    <th> Responsable</th>
                    <th>Etablissement</th>
                    <th>Action</th>

                </thead>
                <tbody>
                {
                        
                        resultat.map(
                
                            mention=>
                            <tr key={mention.idMention}>
                                <td>{mention.idMention}</td>
                                <td>{mention.nomMention}</td>
                                <td>{mention.responsable}</td>
                                <td>{mention.etablissement.nom}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-mention/'+mention.idMention}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteMention(mention.idMention)}}}><FaTrash/></button>
                                </td>
                            </tr>)
                    

                }
                    {
                        mentions.map(
                            mention=>
                            <tr key={mention.idMention}>
                                <td>{mention.idMention}</td>
                                <td>{mention.nomMention}</td>
                                <td>{mention.responsable}</td>
                                <td>{mention.etablissement.nom}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-mention/'+mention.idMention}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteMention(mention.idMention)}}}><FaTrash/></button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

        </div>
    )
}
export default ListeMention