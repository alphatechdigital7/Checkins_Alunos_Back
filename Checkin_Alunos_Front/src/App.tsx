import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Alunos from './pages/Alunos';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/alunos" element={<Alunos />} />
    </Routes>
  );
};

export default App;
