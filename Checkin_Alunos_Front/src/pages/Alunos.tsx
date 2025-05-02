import React, { useEffect, useState, ChangeEvent } from 'react';

interface Aluno {
  matricula: string;
  nome: string;
  responsavel: string;
  email?: string;
}

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [editingMatricula, setEditingMatricula] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const fetchAlunos = async () => {
    try {
      const response = await fetch('http://localhost:3001/all_alunos/');
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleCreateOrUpdate = async () => {
    const alunoData = { matricula, nome, responsavel };
    try {
      if (editingMatricula === null) {
        // Create
        await fetch('http://localhost:3001/novo_aluno', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData),
        });
      } else {
        // Update
        await fetch(`http://localhost:3001/${editingMatricula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData),
        });
        setEditingMatricula(null);
      }
      setMatricula('');
      setNome('');
      setResponsavel('');
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setEditingMatricula(aluno.matricula);
    setMatricula(aluno.matricula);
    setNome(aluno.nome);
    setResponsavel(aluno.responsavel);
  };

  const handleDelete = async (matricula: string) => {
    try {
      await fetch(`http://localhost:3001/${matricula}`, {
        method: 'DELETE',
      });
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleImportCsv = async () => {
    if (!csvFile) {
      alert('Por favor, selecione um arquivo CSV para importar.');
      return;
    }
    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch('http://localhost:3001/import', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Importação realizada com sucesso!');
        setCsvFile(null);
        fetchAlunos();
      } else {
        const errorData = await response.json();
        alert('Erro na importação: ' + errorData.error);
      }
    } catch (error) {
      console.error('Erro ao importar CSV:', error);
      alert('Erro ao importar CSV.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Alunos</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          style={{ marginRight: '1rem' }}
          disabled={editingMatricula !== null}
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Responsável"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleCreateOrUpdate}>
          {editingMatricula === null ? 'Criar' : 'Atualizar'}
        </button>
        {editingMatricula !== null && (
          <button onClick={() => {
            setEditingMatricula(null);
            setMatricula('');
            setNome('');
            setResponsavel('');
          }} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        )}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleImportCsv} disabled={!csvFile} style={{ marginLeft: '1rem' }}>
          Importar CSV
        </button>
      </div>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.responsavel}</td>
              <td>
                <button onClick={() => handleEdit(aluno)} style={{ marginRight: '0.5rem' }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(aluno.matricula)}>Deletar</button>
              </td>
            </tr>
          ))}
          {alunos.length === 0 && (
            <tr>
              <td colSpan={4}>Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Alunos;
