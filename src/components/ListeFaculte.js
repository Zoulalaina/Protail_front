import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FaculteService from "../services/FaculteService";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";


const ListeFaculte=()=>{
    const[facultes, setFaculte]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllFaculte();
    }, [])
    const getAllFaculte=()=>{
        FaculteService.getAllFaculte().then((response)=>{
            setFaculte(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })


    }

    const deleteFaculte=(faculteId)=>{
        FaculteService.deleteFaculte(faculteId).then((response)=>{
            getAllFaculte();
        }).catch(error=>{
            console.log(error);
        })

    }

    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/faculte",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
        .then((response) => response.json())
        .then((json => {
            const results = json.filter((parcours)  =>{
                return value && parcours && parcours.nom && parcours.nom.toLowerCase().includes(value)
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
            <h2 className="text-center"> Liste des Facultés</h2>
            <div className="recherche">
            <div>
            <Link to ="/admin/add-faculte" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id faculté</th>
                    <th> Nom faculté</th>
                    <th>Université</th>
                    <th>Action</th>

                </thead>
                <tbody>
                {
                        
                        resultat.map(
                
                            faculte=>
                            <tr key={faculte.idEtab}>
                                <td>{faculte.idEtab}</td>
                                <td>{faculte.nom}</td>
                                <td>{faculte.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-faculte/'+faculte.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteFaculte(faculte.idEtab)}}}><FaTrash/></button>
                                </td>
                            </tr>)
                    

                }
                    {
                        facultes.map(
                            faculte=>
                            <tr key={faculte.idEtab}>
                                <td>{faculte.idEtab}</td>
                                <td>{faculte.nom}</td>
                                <td>{faculte.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-faculte/'+faculte.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteFaculte(faculte.idEtab)}}}><FaTrash/></button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

        </div>
    )
}
export default ListeFaculte