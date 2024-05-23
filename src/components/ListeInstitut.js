import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import InstitutService from "../services/InstitutService";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";

const ListeInstitut=()=>{
    const[instituts, setInstitut]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllInstitut();
    }, [])
    const getAllInstitut=()=>{
        InstitutService.getAllInstitut().then((response)=>{
            setInstitut(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })

    }

    const deleteInstitut=(institutId)=>{
        InstitutService.deleteInstitut(institutId).then((response)=>{
            getAllInstitut();
        }).catch(error=>{
            console.log(error);
        })

    }

    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/institus",{
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
            <h2 className="text-center"> Liste des institus</h2>
            <div className="recherche">
            <div>
            <Link to ="/admin/add-institut" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id institut</th>
                    <th> Nom institut</th>
                    <th>Université</th>
                    <th>Action</th>
                </thead>
                <tbody>
                {
                        
                        resultat.map(
                
                            institut=>
                            <tr key={institut.idEtab}>
                                <td>{institut.idEtab}</td>
                                <td>{institut.nom}</td>
                                <td>{institut.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-institut/'+institut.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteInstitut(institut.idEtab)}}}><FaTrash/></button>
                                </td>
                            </tr>)
                    

                }
                    {
                        instituts.map(
                            institut=>
                            <tr key={institut.idEtab}>
                                <td>{institut.idEtab}</td>
                                <td>{institut.nom}</td>
                                <td>{institut.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-institut/'+institut.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteInstitut(institut.idEtab)}}}><FaTrash/></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default ListeInstitut