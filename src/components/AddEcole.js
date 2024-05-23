import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EcoleService from '../services/EcoleService';


const AddEcole = () => {
  const [nom, setNom] = useState('');
  const [idUniversite, setIdUniversite] = useState(21); // Université par défaut
  const [universites, setUniversites] = useState([]); // Liste des universités
  const token = sessionStorage.getItem("token");

  const {id} = useParams();

  const navigate = useNavigate();

  // Fonction pour récupérer la liste des universités
  const fetchUniversites = async () => {
    const response = await fetch("http://localhost:8080/api/v1/university",{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    const data = await response.json();
    setUniversites(data);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const ecole = {
      nom,
      universite: {
        idUniversite,
      },
    };
    if(id){
      const response = await fetch("http://localhost:8080/api/v1/ecole/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ecole),
      });
  
      if (response.ok) {
        navigate("/ecole");
        // Vider le formulaire
        setNom('');
        setIdUniversite(21);
      } else {
        alert('Erreur lors de l\'ajout de la ecole.');
      }
    }else{
      const response = await fetch("http://localhost:8080/api/v1/ecole", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ecole),
      });
  
      if (response.ok) {
        navigate("/ecole");
        // Vider le formulaire
        setNom('');
        setIdUniversite(21);
      } else {
        alert('Erreur lors de l\'ajout de la ecole.');
      }
    }

  
  };

  // useEffect pour récupérer la liste des universités au montage du composant
  useEffect(() => {
    fetchUniversites();
    EcoleService.getEcoleById(id).then((response)=>{
      setNom(response.data.nom)
      setIdUniversite(response.data.universite.idUniversite)
    }).catch(error=>{
      console.log(error)
    })
  }, []);
  

  const title= ()=>{
    if(id){
      return <h2 className='text-center'>Modifier une ecole</h2>
    }else{
      return <h2 className='text-center'>Ajouter une ecole</h2>
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
      

            {
              title()
            }

              <div className="card-body">
      <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
        <label className="form-label">Nom de la ecole:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control"/>
                  </div>
                  <div className="form-group mb-2">
        <label className="form-label">Université:</label>
        <select value={idUniversite} onChange={(e) => setIdUniversite(e.target.value)} className="form-select" >
          {universites.map((universite) => (
            <option key={universite.idUniversite} value={universite.idUniversite}>
              {universite.nomUniversite}
            </option>
          ))}
        </select>
              </div>

        <button type="submit">Ajouter</button>
      </form>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddEcole;
