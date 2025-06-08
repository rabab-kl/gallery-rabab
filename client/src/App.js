import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AddPhotoPage from './pages/AddPhotoPage';
import PhotoListPage from './pages/PhotoListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-photo" element={<AddPhotoPage />} />
        <Route path="/gallery" element={<PhotoListPage />} />
        {/* Redirection de la racine vers /gallery */}
        <Route path="/" element={<Navigate to="/gallery" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

