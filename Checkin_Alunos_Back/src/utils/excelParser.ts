import * as XLSX from 'xlsx';
import { Tb_Alunos } from '../entities/Tb_Alunos';
import { Tb_Usuarios } from '../entities/Tb_Usuarios';

export class ExcelParser {
    static parseAlunos(buffer: Buffer): Partial<Tb_Alunos>[] {
        const workbook = XLSX.read(buffer);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);
        
        return jsonData.map((row) => {
            // Validação básica
            if (!row.matricula && !row.Matricula && !row.MATRICULA) {
                throw new Error('Matrícula é obrigatória para todos os alunos');
            }

            // Cria usuário admin padrão
            const usuarioAdmin = new Tb_Usuarios();
            usuarioAdmin.id_usuarios = 1;
            usuarioAdmin.nome = 'Admin';
            usuarioAdmin.email = 'admin@escola.com';
            usuarioAdmin.senha = '';
            usuarioAdmin.created_at = new Date();
            usuarioAdmin.updated_at = new Date();

            // Cria objeto de aluno
            const aluno = new Tb_Alunos();
            // Mapeia os nomes das colunas conforme estão no arquivo Excel
            aluno.matricula = row.MATRICULA || row.matricula || row.Matricula || '';
            aluno.nome = row['NOME DO ESTUDANTE'] || row.nome || row.Nome || row.NOME || '';
            aluno.telefone = row['TELEFONE DO ESTUDANTE'] || row.telefone || row.Telefone || row.TELEFONE || '';
            aluno.email = row['EMAIL DO ESTUDANTE'] || row.email || row.Email || row.EMAIL || '';
            aluno.resp1 = row['NOME DO RESPONSÁVEL 01 (MÃE)'] || row.responsavel1 || row.Responsavel1 || row.RESPONSAVEL1 || '';
            aluno.telefone_resp1 = row['TELEFONE DO RESPONSÁVEL 01 (MÃE)'] || row.telefone_responsavel1 || row['Telefone Responsavel1'] || row['TELEFONE RESPONSAVEL1'] || '';
            aluno.email_resp1 = row['EMAIL DO DO RESPONSÁVEL 01 (MÃE)'] || row.email_responsavel1 || row['Email Responsavel1'] || row['EMAIL RESPONSAVEL1'] || '';
            aluno.resp2 = row['NOME DO RESPONSÁVEL 02 (PAI)'] || row.responsavel2 || row.Responsavel2 || row.RESPONSAVEL2 || '';
            aluno.telefone_resp2 = row['TELEFONE DO RESPONSÁVEL 02 (PAI)'] || row.telefone_responsavel2 || row['Telefone Responsavel2'] || row['TELEFONE RESPONSAVEL2'] || '';
            aluno.email_resp2 = row['EMAIL DO DO RESPONSÁVEL 02 (PAI)'] || row.email_responsavel2 || row['Email Responsavel2'] || row['EMAIL RESPONSAVEL2'] || '';
            // Atribui o objeto de usuário completo conforme exigido pela entidade
            // Solução temporária - usar apenas o ID numérico
            if (!usuarioAdmin || !usuarioAdmin.id_usuarios) {
                throw new Error('Usuário admin inválido');
            }
            aluno.usuario_id = { id_usuarios: usuarioAdmin.id_usuarios } as Tb_Usuarios;

            return aluno;
        });
    }
}
