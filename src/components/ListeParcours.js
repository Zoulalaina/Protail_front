import React, { useState } from "react";
import { useEffect } from "react";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ParcoursService from "../services/ParcoursService";


const ListeParcours=()=>{
    const[parcourss, setParcours]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllParcours();
    }, [])
    const getAllParcours=()=>{
        ParcoursService.getAllParcours().then((response)=>{
            setParcours(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })


    }

    const deleteParcours=(parcoursId)=>{
        ParcoursService.deleteParcours(parcoursId).then((response)=>{
            getAllParcours();
        }).catch(error=>{
            console.log(error);
        })

    }
    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/parcours/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
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
        <div className="container">
            <h2 className="text-center"> Liste des parcours</h2>
            <div className="recherche">
            <div>
            <Link to ="/admin/add-parcours" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id parcours</th>
                    <th> Nom parcours</th>
		            <th> Niveau</th>
			        <th> Condition</th>
                    <th> Responsable</th>
			        <th> Langue</th>
                    <th> cout</th>
                    <th> bourse</th>
                    <th>Mention</th>
                    <th>Action</th>

                </thead>
                <tbody>
                {
                        
                        resultat.map(
                
                            parcours=>
                            <tr key={parcours.idParcours}>
                                <td>{parcours.idParcours}</td>
                                <td>{parcours.nomParcours}</td>
				                <td>{parcours.niveau}</td>
				                <td>{parcours.codition}</td>
                                <td>{parcours.responsable}</td>
                                <td>{parcours.langue}</td>
                                <td>{parcours.cout}</td>
                                <td>{parcours.bourse}</td>
                                <td>{parcours.mention.nomMention}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-parcours/'+parcours.idParcours}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteParcours(parcours.idParcours)}}}><FaTrash/></button>
                                </td>
                            </tr>)
                    

                }
                    {
                        parcourss.map(
                            parcours=>
                            <tr key={parcours.idParcours}>
                                <td>{parcours.idParcours}</td>
                                <td>{parcours.nomParcours}</td>
				                <td>{parcours.niveau}</td>
				                <td>{parcours.codition}</td>
                                <td>{parcours.responsable}</td>
                                <td>{parcours.langue}</td>
                                <td>{parcours.cout}</td>
                                <td>{parcours.bourse}</td>
                                <td>{parcours.mention.nomMention}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-parcours/'+parcours.idParcours}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteParcours(parcours.idParcours)}}}><FaTrash/></button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

        </div>
    )
}
export default ListeParcours