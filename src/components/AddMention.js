import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MentionService from '../services/MentionService';


const AddMention = () => {
  const [nomMention, setNomMention] = useState('');
  const [responsable, setResponsable] = useState('');
  const [idEtab, setIdEtab] = useState(1); // Université par défaut
  const [etablissements, setEtablissements] = useState([]); // Liste des universités
  const token = sessionStorage.getItem("token");

  const {id} = useParams();

  const navigate = useNavigate();

  // Fonction pour récupérer la liste des universités
  const fetchEtablissements = async () => {
    const response = await fetch("http://localhost:8080/api/v1/etablissement",{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    const data = await response.json();
    setEtablissements(data);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const mention = {
      nomMention,
      responsable,
      etablissement: {
        idEtab,
      },
    };
    if(id){
      const response = await fetch("http://localhost:8080/api/v1/mention/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mention),
      });
  
      if (response.ok) {
        navigate("/mention");
        // Vider le formulaire
        setNomMention('');
        setResponsable('');
        setIdEtab(1);
      } else {
        alert('Erreur lors de l\'ajout de la mention.');
      }
    }else{
      const response = await fetch("http://localhost:8080/api/v1/mention", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mention),
      });
  
      if (response.ok) {
        navigate("/mention");
        // Vider le formulaire
        setNomMention('');
        setResponsable('')
        setIdEtab(1);
      } else {
        alert('Erreur lors de l\'ajout de la mention.');
      }
    }

  
  };

  // useEffect pour récupérer la liste des universités au montage du composant
  useEffect(() => {
    fetchEtablissements();
    MentionService.getMentionById(id).then((response)=>{
      setNomMention(response.data.nomMention)
      setResponsable(response.data.responsable)
      setIdEtab(response.data.etablissement.idEtab)
    }).catch(error=>{
      console.log(error)
    })
  }, []);
  

  const title= ()=>{
    if(id){
      return <h2 className='text-center'>Modifier une mention</h2>
    }else{
      return <h2 className='text-center'>Ajouter une mention</h2>
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
        <label className="form-label">Nom de la mention:</label>
        <input type="text" value={nomMention} onChange={(e) => setNomMention(e.target.value)} className="form-control"/>
                  </div>
                  <div className="form-group mb-2">
        <label className="form-label">Responsable:</label>
        <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)} className="form-control"/>
                  </div>




                  <div className="form-group mb-2">
        <label className="form-label">Etablissement:</label>
        <select value={idEtab} onChange={(e) => setIdEtab(e.target.value)} className="form-select" >
          {etablissements.map((etablissement) => (
            <option key={etablissement.idEtab} value={etablissement.idEtab}>
              {etablissement.nom}
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

export default AddMention;
