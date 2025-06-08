import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPhotoPage from './pages/AddPhotoPage'; // Chemin vers ta page d'ajout

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-photo" element={<AddPhotoPage />} />
        {/* Tu peux ajouter d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;

