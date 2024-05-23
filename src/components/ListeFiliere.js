import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FiliereService from "../services/FiliereService";


const ListeFiliere=()=>{
    const[filieres, setFiliere]=useState([])

    useEffect(()=>{
        getAllFiliere();
    }, [])
    const getAllFiliere=()=>{
        FiliereService.getAllFiliere().then((response)=>{
            setFiliere(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })


    }

    const deleteFiliere=(filiereId)=>{
        FiliereService.deleteFiliere(filiereId).then((response)=>{
            getAllFiliere();
        }).catch(error=>{
            console.log(error);
        })

    }
    return(
        <div className="container">
            <h2 className="text-center"> Liste des Universités</h2>
            <Link to ="/admin/add-filiere" className="btn btn-primary mb-2">Ajouter</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id filière</th>
                    <th> Nom filière</th>
                    <th>cout </th>
                    <th>Université</th>
                    <th>Action</th>

                </thead>
                <tbody>
                    {
                        filieres.map(
                            filiere=>
                            <tr key={filiere.idFiliere}>
                                <td>{filiere.idFiliere}</td>
                                <td>{filiere.nomFiliere}</td>
                                <td>{filiere.cout}</td>
                                <td>{filiere.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to="admin.filiere">Modifier</Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}}>Supprimer</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

        </div>
    )
}
export default ListeFiliere