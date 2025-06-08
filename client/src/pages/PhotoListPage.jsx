import React, { useEffect, useState } from 'react';
import './PhotoListPage.css';

function PhotoListPage() {
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/photos/')
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error('Erreur de chargement', err));
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Galerie de photos</h1>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <a href="/add-photo" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px' }}>➕ Ajouter une photo</button>
        </a>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'pointer',
          }}
        >
          <div>
            <h2 style={{ color: 'white', textAlign: 'center' }}>{selected.titre}</h2>
            <img
              src={`data:image/jpeg;base64,${selected.image_base64}`}
              alt={selected.titre}
              style={{ maxWidth: '90%', maxHeight: '80vh', borderRadius: 8 }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelected(photo)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <img
              src={`data:image/jpeg;base64,${photo.image_base64}`}
              alt={photo.titre}
              style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
            />
            <p>
              <strong>{photo.titre}</strong>
              <br />
              {photo.auteur}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoListPage;

