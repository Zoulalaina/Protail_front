import React, { useEffect, useState } from 'react';


const AddFiliereForm = () => {
  const [nomFiliere, setNomFiliere] = useState('');
  const [cout, setCout] = useState(0);
  const [idUniversite, setIdUniversite] = useState(21); // Université par défaut
  const [universites, setUniversites] = useState([]); // Liste des universités
  const token = sessionStorage.getItem("token");

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

    const filiere = {
      nomFiliere,
      cout,
      universite: {
        idUniversite,
      },
    };

    const response = await fetch("http://localhost:8080/api/v1/filiere", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(filiere),
    });

    if (response.ok) {
      alert('Filière ajoutée avec succès!');
      // Vider le formulaire
      setNomFiliere('');
      setCout(0);
      setIdUniversite(21);
    } else {
      alert('Erreur lors de l\'ajout de la filière.');
    }
  };

  // useEffect pour récupérer la liste des universités au montage du composant
  useEffect(() => {
    fetchUniversites();
  }, []);

  return (
    <div>
      <h2>Formulaire d'ajout de filière</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom de la filière:</label>
        <input type="text" value={nomFiliere} onChange={(e) => setNomFiliere(e.target.value)} />

        <label>Coût:</label>
        <input type="number" value={cout} onChange={(e) => setCout(e.target.value)} />

        <label>Université:</label>
        <select value={idUniversite} onChange={(e) => setIdUniversite(e.target.value)}>
          {universites.map((universite) => (
            <option key={universite.idUniversite} value={universite.idUniversite}>
              {universite.nomUniversite}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddFiliereForm;
