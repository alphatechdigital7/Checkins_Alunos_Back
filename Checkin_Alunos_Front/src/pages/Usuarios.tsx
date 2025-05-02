import React, { useEffect, useState } from 'react';

interface Usuario {
  id_usuarios: number;
  nome: string;
  email: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('/usuarios/all_usuarios/');
      if (!response.ok) {
        console.error('Erro na resposta do servidor:', response.status);
        return;
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreateOrUpdate = async () => {
    const userData = { nome, email };
    try {
      if (editingId === null) {
        // Create
        await fetch('/usuarios/novo_usuario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
          mode: 'cors',
        });
      } else {
        // Update
        await fetch(`/usuarios/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
          mode: 'cors',
        });
        setEditingId(null);
      }
      setNome('');
      setEmail('');
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingId(usuario.id_usuarios);
    setNome(usuario.nome);
    setEmail(usuario.email);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/usuarios/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      });
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Usuários</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleCreateOrUpdate}>
          {editingId === null ? 'Criar' : 'Atualizar'}
        </button>
        {editingId !== null && (
          <button onClick={() => {
            setEditingId(null);
            setNome('');
            setEmail('');
          }} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        )}
      </div>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuarios}>
              <td>{usuario.id_usuarios}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => handleEdit(usuario)} style={{ marginRight: '0.5rem' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(usuario.id_usuarios)}>Deletar</button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={4}>Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
