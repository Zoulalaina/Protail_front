import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UnivService from '../services/UnivService';


const AddUniversityForm = () => {
  const [file, setFile] = useState(null);
  const [nomUniversite, setNomUniversite] = useState('');
  const [siegeUniversite, setSiegeUniversite] = useState('');
  const [historique, setHistorique] = useState('');
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const {id} = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNomUniversiteChange = (event) => {
    setNomUniversite(event.target.value);
  };

  const handleSiegeUniversiteChange = (event) => {
    setSiegeUniversite(event.target.value);
  };
  const handleHistoriqueChange = (event) => {
    setHistorique(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nomUniversite', nomUniversite);
    formData.append('siegeUniversite', siegeUniversite);
    formData.append('historique', historique);

    if(id){
      fetch("http://localhost:8080/api/v1/university/"+id, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Afficher la réponse du serveur dans la console
        // Faire d'autres traitements ou redirection après l'ajout réussi
        navigate("/admin");

      })
      .catch((error) => {
        console.error('Error:', error);
        // Gérer les erreurs
      });

    }else{
      fetch("http://localhost:8080/api/v1/university", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Afficher la réponse du serveur dans la console
        // Faire d'autres traitements ou redirection après l'ajout réussi
        navigate("/admin");

      })
      .catch((error) => {
        console.error('Error:', error);
        // Gérer les erreurs
      });
    }

    
  };
  useEffect(()=>{
    UnivService.getUnivById(id).then((response)=>{
      setNomUniversite(response.data.nomUniversite)
      setSiegeUniversite(response.data.siegeUniversite)
      setHistorique(response.data.historique)
      setFile(response.data.image)
    }).catch(error =>{
      console.log(error)
    })


  }, [])

  const title= ()=>{
    if(id){
      return <h2 className='text-center'>Modifier une université</h2>
    }else{
      return <h2 className='text-center'>Ajouter une université</h2>
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
      <div className="form-group md-2">
        <label htmlFor="file" className="form-label">Image:</label>
        <input type="file" className="form-control" id="file" onChange={handleFileChange}/>
      </div>
      <div className="form-group md-2">
        <label htmlFor="nomUniversite" className="form-label">Nom de l'université:</label>
        <input
          type="text"
          id="nomUniversite"
          value={nomUniversite}
          onChange={handleNomUniversiteChange}
          className="form-control"
        />
      </div>
      <div className="form-group md-2">
        <label htmlFor="siegeUniversite" className="form-label">Siège de l'université:</label>
        <input
          type="text"
          id="siegeUniversite"
          value={siegeUniversite}
          onChange={handleSiegeUniversiteChange}
          className="form-control"
        />
      </div>
      <div className="form-group md-2">
        <label htmlFor="historique" className="form-label">Historique:</label>
        <input
          type="text"
          id="historique"
          value={historique}
          onChange={handleHistoriqueChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-success">OK</button>
      <Link to="/home" className='btn btn-danger'>Annuler</Link>
    </form>

            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
};

export default AddUniversityForm;