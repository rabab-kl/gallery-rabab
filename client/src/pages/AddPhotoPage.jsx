import React, { useState } from 'react';

function AddPhotoPage() {
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    date: '',
    emplacement: '',
    image_base64: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image_base64: reader.result.split(',')[1], // retire le prefixe base64
        }));
      };
      if (files && files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      titre: formData.titre,
      auteur: formData.auteur,
      date: formData.date,
      emplacement: formData.emplacement,
      image_base64: formData.image_base64,
    };

    console.log("Sending:", payload);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/photos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Photo ajoutée !');
        setFormData({
          titre: '',
          auteur: '',
          date: '',
          emplacement: '',
          image_base64: '',
        });
      } else {
        console.error("Erreur réponse:", result);
        alert("Erreur lors de l’ajout : " + JSON.stringify(result));
      }
    } catch (err) {
      console.error("Erreur fetch:", err);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <div>
      <h1>Ajouter une photo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={formData.titre}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="auteur"
          placeholder="Auteur"
          value={formData.auteur}
          onChange={handleChange}
        /><br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="emplacement"
          placeholder="Emplacement"
          value={formData.emplacement}
          onChange={handleChange}
        /><br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        /><br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default AddPhotoPage;

