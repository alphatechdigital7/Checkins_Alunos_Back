import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao sistema Checkin Alunos</h1>
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/usuarios')} style={{ marginRight: '1rem', padding: '1rem 2rem' }}>
          Usuários
        </button>
        <button onClick={() => navigate('/alunos')} style={{ padding: '1rem 2rem' }}>
          Alunos
        </button>
      </div>
    </div>
  );
};

export default Home;
