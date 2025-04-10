import { Tb_Alunos } from '../entities/Tb_Alunos';
import { Tb_Usuarios } from '../entities/Tb_Usuarios';

export class CsvParser {
    static parseAlunos(csvData: string): Partial<Tb_Alunos>[] {
        const lines = csvData.split('\n')
            .filter(line => line.trim() !== '' && !line.startsWith(';') && !line.startsWith('MATRICULA'));
        
        return lines.map(line => {
            const values = line.split(';');
            
            // Validação básica
            if (!values[0] || isNaN(Number(values[0]))) {
                throw new Error(`Matrícula inválida: ${values[0]}`);
            }

            // Cria usuário admin padrão
            const usuarioAdmin = new Tb_Usuarios();
            usuarioAdmin.id_usuarios = 1;
            usuarioAdmin.nome = 'Admin';
            usuarioAdmin.email = 'admin@escola.com';

            // Cria objeto de aluno
            const aluno = new Tb_Alunos();
            aluno.matricula = values[0].trim();
            aluno.nome = values[1].trim();
            aluno.telefone = values[2].trim();
            aluno.email = values[3].trim();
            aluno.resp1 = values[4].trim();
            aluno.telefone_resp1 = values[5].trim();
            aluno.email_resp1 = values[6].trim();
            aluno.resp2 = values[7].trim();
            aluno.telefone_resp2 = values[8].trim();
            aluno.email_resp2 = values[9].trim();
            aluno.usuario_id = { id_usuarios: usuarioAdmin.id_usuarios } as Tb_Usuarios;

            return aluno;
        });
    }
}
