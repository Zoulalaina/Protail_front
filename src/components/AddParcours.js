import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ParcoursService from '../services/ParcoursService';


const AddParcours = () => {
  const [nomParcours, setNomParcours] = useState('');
  const [niveau, setNiveau] = useState('');
  const [langue, setLangue] = useState('');
  const [codition, setCodition] = useState('');
  const [cout, setCout] = useState('');
  const [bourse, setBourse] = useState('');
  const [capasite, setCapasite] = useState('');
  const [responsable, setResponsable] = useState('');
  const [idMention, setIdMention] = useState(2); // Université par défaut
  const [mentions, setMentions] = useState([]); // Liste des universités
  const token = sessionStorage.getItem("token");

  const {id} = useParams();

  const navigate = useNavigate();

  // Fonction pour récupérer la liste des universités
  const fetchMentions = async () => {
    const response = await fetch("http://localhost:8080/api/v1/mention",{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    const data = await response.json();
    setMentions(data);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    const parcours = {
      nomParcours,
	    niveau,
	    langue,
	    codition,
      cout,
      bourse,
	    capasite,
	    responsable,
      mention: {
        idMention,
      },
    };
    if(id){
      const response = await fetch("http://localhost:8080/api/v1/parcours/"+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parcours),
      });
  
      if (response.ok) {
        navigate("/parcours");
        // Vider le formulaire
        setNomParcours('');
        setCapasite('');
        setCodition('');
        setLangue('');
        setCout('');
        setBourse('');
        setNiveau('');
        setResponsable('');
        setIdMention(2);
      } else {
        alert('Erreur lors de l\'ajout de la parcours.');
      }
    }else{
      const response = await fetch("http://localhost:8080/api/v1/parcours", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parcours),

      });
  
      if (response.ok) {
        navigate("/parcours");
        // Vider le formulaire
        setNomParcours('');
        setCapasite('');
        setCodition('');
        setLangue('');
        setCout('');
        setBourse('');
        setNiveau('');
        setResponsable('');
        setIdMention(2);
      } else {
        alert('Erreur lors de l\'ajout de la parcours.');
      }
    }

  
  };

  // useEffect pour récupérer la liste des universités au montage du composant
  useEffect(() => {
    fetchMentions();
    ParcoursService.getParcoursById(id).then((response)=>{
        setNomParcours(response.data.nomParcours);
        setCapasite(response.data.capasite);
        setCodition(response.data.codition);
        setLangue(response.data.langue);
        setCout(response.data.cout);
        setBourse(response.data.bourse);
        setNiveau(response.data.niveau);
        setResponsable(response.data.responsable);
      setIdMention(response.data.mention.idMention)
    }).catch(error=>{
      console.log(error)
    })
  }, []);
  

  const title= ()=>{
    if(id){
      return <h2 className='text-center'>Modifier une parcours</h2>
    }else{
      return <h2 className='text-center'>Ajouter une parcours</h2>
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
        <label className="form-label">Nom de la parcours:</label>
        <input type="text" value={nomParcours} onChange={(e) => setNomParcours(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Niveau:</label>
        <input type="text" value={niveau} onChange={(e) => setNiveau(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Responsable:</label>
        <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Condition:</label>
        <input type="text" value={codition} onChange={(e) => setCodition(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Cout:</label>
        <input type="text" value={cout} onChange={(e) => setCout(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Bourse:</label>
        <input type="text" value={bourse} onChange={(e) => setBourse(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Capacité d'accueil:</label>
        <input type="text" value={capasite} onChange={(e) => setCapasite(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">langue:</label>
        <input type="text" value={langue} onChange={(e) => setLangue(e.target.value)} className="form-control"/>
                  </div>

                  <div className="form-group mb-2">
        <label className="form-label">Mention:</label>
        <select value={idMention} onChange={(e) => setIdMention(e.target.value)} className="form-select" >
          {mentions.map((mention) => (
            <option key={mention.idMention} value={mention.idMention}>
              {mention.nomMention}
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

export default AddParcours;
