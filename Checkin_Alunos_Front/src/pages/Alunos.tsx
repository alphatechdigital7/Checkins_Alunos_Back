import React, { useEffect, useState, ChangeEvent } from 'react';

interface Aluno {
  matricula: string;
  nome: string;
  telefone: string;
  email: string;
  resp1: string;
  telefone_resp1: string;
  email_resp1: string;
  resp2: string;
  telefone_resp2: string;
  email_resp2: string;
}

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [resp1, setResp1] = useState('');
  const [telefone_resp1, setTelefone_Resp1] = useState('');
  const [email_resp1, setEmail_Resp1] = useState('');
  const [resp2, setResp2] = useState('');
  const [telefone_resp2, setTelefone_Resp2] = useState('');
  const [email_resp2, setEmail_Resp2] = useState('');
  const [editingMatricula, setEditingMatricula] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const fetchAlunos = async () => {
    try {
      const response = await fetch('/alunos/all_alunos/');
      if (!response.ok) {
        console.error('Erro na resposta do servidor:', response.status);
        return;
      }
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
    const alunoData = { matricula, nome, telefone, email, resp1, telefone_resp1, email_resp1, resp2, telefone_resp2, email_resp2 };
    try {
      if (editingMatricula === null) {
        // Create
        await fetch('/alunos/novo_aluno', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData),
          mode: 'cors',
        });
      } else {
        // Update
        await fetch(`/alunos/${editingMatricula}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData),
          mode: 'cors',
        });
        setEditingMatricula(null);
      }
      
      setMatricula('');
      setNome('');
      setTelefone('');
      setEmail('');
      setResp1('');
      setTelefone_Resp1('');
      setEmail_Resp1('');
      setResp2('');
      setTelefone_Resp2('');
      setEmail_Resp2('');
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno.');
    }
  };

  <td colSpan={11}>Nenhum aluno encontrado.</td>

  const handleEdit = (aluno: Aluno) => {
    setEditingMatricula(aluno.matricula);
    setMatricula(aluno.matricula);
    setNome(aluno.nome);
    setTelefone(aluno.telefone);
    setEmail(aluno.email);
    setResp1(aluno.resp1);
    setTelefone_Resp1(aluno.telefone_resp1);
    setEmail_Resp1(aluno.email_resp1);
    setResp2(aluno.resp2);
    setTelefone_Resp2(aluno.telefone_resp2);
    setEmail_Resp2(aluno.email_resp2);
  };

  const handleDelete = async (matricula: string) => {
    try {
      await fetch(`/alunos/${matricula}`, {
        method: 'DELETE',
        mode: 'cors',
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
      const response = await fetch('/alunos/import', {
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
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input 
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Responsável 1"
          value={resp1}
          onChange={(e) => setResp1(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Telefone Responsável 1"
          value={telefone_resp1}
          onChange={(e) => setTelefone_Resp1(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Email Responsável 1"
          value={email_resp1}
          onChange={(e) => setEmail_Resp1(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Responsável 2"
          value={resp2}
          onChange={(e) => setResp2(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Telefone Responsável 2"
          value={telefone_resp2}
          onChange={(e) => setTelefone_Resp2(e.target.value)}
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
            setTelefone('');
            setEmail('');
            setResp1('');
            setTelefone_Resp1('');
            setEmail_Resp1('');
            setResp2('');
            setTelefone_Resp2('');
            setEmail_Resp2('');
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
            <th>Telefone</th>
            <th>Email</th>
            <th>Responsável 1</th>
            <th>Telefone Responsável 1</th>
            <th>Email Responsável 1</th>
            <th>Responsável 2</th>
            <th>Telefone Responsável 2</th>
            <th>Email Responsável 2</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.matricula}>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.telefone}</td>
              <td>{aluno.email}</td>
              <td>{aluno.resp1}</td>
              <td>{aluno.telefone_resp1}</td>
              <td>{aluno.email_resp1}</td>
              <td>{aluno.resp2}</td>
              <td>{aluno.telefone_resp2}</td>
              <td>{aluno.email_resp2}</td>
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
