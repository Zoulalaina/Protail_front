import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UnivService from "../services/UnivService";
import { FaTrash, FaEdit, FaPlus, FaSearch } from "react-icons/fa";


const ListeUniv=()=>{
    const[universites, setUniversites]=useState([])
    const [input, SetInput]= useState("");
    const [resultat, setResultat] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(()=>{
        getAllUniversite();
    }, [])
    const getAllUniversite=()=>{
        UnivService.getAllUniv().then((response)=>{
            setUniversites(response.data)
            console.log(response.data);

        }).catch(error =>{
            console.log(error);
        })


    }

    const deleteUniv=(universiteid)=>{
        UnivService.deleteUniv(universiteid).then((response)=>{
            getAllUniversite();
        }).catch(error=>{
            console.log(error);
        })

    }

    const fechData = (value) =>{
        fetch("http://localhost:8080/api/v1/university/all",{
            headers: {
              'Authorization': `Bearer ${token}`
            }})
        .then((response) => response.json())
        .then((json => {
            const results = json.filter((parcours)  =>{
                return value && parcours && parcours.nomUniversite && parcours.nomUniversite.toLowerCase().includes(value)
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
            <h2 className="text-center"> Liste des Universités</h2>
            <div className="recherche">
            <div>
            <Link to ="/add-univ" className="btn btn-primary mb-2"><FaPlus/></Link>
            </div>
            <div className="recherche2">
            <FaSearch id="search-icon"/>
            <input placeholder="Recherchez ici..."value={input} onChange={(e) => handleChange(e.target.value)}/>
          
            </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> id Université</th>
                    <th> Nom Université</th>
                    <th>Siege Université</th>
                    <th>Photo</th>
                    <th>Action</th>

                </thead>
                <tbody>
                    
                    {
                        
                            resultat.map(universite=>
                    
                                <tr key={universite.idUniversite}>
                                    <td>{universite.idUniversite}</td>
                                    <td>{universite.nomUniversite}</td>
                                    <td>{universite.siegeUniversite}</td>
                                    <td><img src={'data:image/png;base64,'+universite.image} style={{width:'200px', height:'100px'}} alt="univ"></img></td>
                                    <td>
                                     <Link className="btn btn-info" to={'/edit-univ/'+universite.idUniversite}><FaEdit/></Link>
                                     <button className="btn btn-danger" onClick={()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){ deleteUniv(universite.idUniversite)}}} style={{marginLeft:"10px"}}><FaTrash/></button>
                                    
                                    </td>
                                </tr>)
                        

                    }
                
                    {
                        universites.map(
                            universite=>
                            <tr key={universite.idUniversite}>
                                <td>{universite.idUniversite}</td>
                                <td>{universite.nomUniversite}</td>
                                <td>{universite.siegeUniversite}</td>
                                <td><img src={'data:image/png;base64,'+universite.image} style={{width:'200px', height:'100px'}} alt="univ"></img></td>
                                <td>
                                 <Link className="btn btn-info" to={'/edit-univ/'+universite.idUniversite}><FaEdit/></Link>
                                 <button className="btn btn-danger" onClick={()=>{if(window.confirm('Etes-vous sûr de vouloir supprimer cette information')){ deleteUniv(universite.idUniversite)}}} style={{marginLeft:"10px"}}><FaTrash/></button>
                                
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

        </div>
    )
}
export default ListeUniv