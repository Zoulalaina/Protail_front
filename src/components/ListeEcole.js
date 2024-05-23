import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import EcoleService from "../services/EcoleService";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";


const ListeEcole=()=>{
    const[ecoles, setEcole]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllEcole();
    }, [])
    const getAllEcole=()=>{
        EcoleService.getAllEcole().then((response)=>{
            setEcole(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })

    }

    const deleteEcole=(ecoleId)=>{
        EcoleService.deleteEcole(ecoleId).then((response)=>{
            getAllEcole();
        }).catch(error=>{
            console.log(error);
        })

    }

    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/ecole",{
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
            <h2 className="text-center"> Liste des écoles</h2>
            <div className="recherche">
            <div>
            <Link to ="/admin/add-ecole" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id ecole</th>
                    <th> Nom ecole</th>
                    <th>Université</th>
                    <th>Action</th>
                </thead>
                <tbody>
                {
                        
                        resultat.map(
                
                            ecole=>
                            <tr key={ecole.idEtab}>
                                <td>{ecole.idEtab}</td>
                                <td>{ecole.nom}</td>
                                <td>{ecole.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-ecole/'+ecole.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteEcole(ecole.idEtab)}} }><FaTrash/></button>
                                </td>
                            </tr>)
                    

                }
                    {
                        ecoles.map(
                            ecole=>
                            <tr key={ecole.idEtab}>
                                <td>{ecole.idEtab}</td>
                                <td>{ecole.nom}</td>
                                <td>{ecole.universite.nomUniversite}</td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-ecole/'+ecole.idEtab}><FaEdit/></Link>
                                 <button className="btn btn-danger"  style={{marginLeft:"10px"}} onClick = {()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){deleteEcole(ecole.idEtab)}} }><FaTrash/></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}
export default ListeEcole