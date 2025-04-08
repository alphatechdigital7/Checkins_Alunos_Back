import { AppDataSource } from "../database/database";  // Importa a fonte de dados configurada (DataSource)
import { Tb_Alunos } from "../entities/Tb_Alunos";   // Importa a entidade de usuários para realizar as operações no banco

// Serviço para gerenciar operações relacionadas a usuários.

export class AlunosServices {
    private alunosRepository = AppDataSource.getRepository(Tb_Alunos);

    async create(data: Partial<Tb_Alunos>): Promise<Tb_Alunos> {
        try {
            console.log('[SERVICE] Iniciando criação de aluno com dados:', data);

            // Valida campos obrigatórios
            if (!data.matricula) {
                throw new Error('Matricula do aluno é obrigatório');
            }
            if (!data.nome?.trim()) {
                throw new Error('Nome do aluno é obrigatório');
            }
            if (!data.telefone?.trim()) {
                throw new Error('Telefone do aluno é obrigatório');
            }
            if (!data.email?.trim()) {
                throw new Error('Email do aluno é obrigatório');
            }
            if (!data.resp1?.trim()) {
                throw new Error('Nome do Responsável 1 é obrigatório');
            }
            if (!data.telefone_resp1?.trim()) {
                throw new Error('Telefone do Responsável 1 é obrigatório');
            }
            if (!data.email_resp1?.trim()) {
                throw new Error('Email do Responsável 1 é obrigatório');
            }
            if (!data.resp2?.trim()) {
                throw new Error('Nome do Responsável 2 é obrigatório');
            }
            if (!data.telefone_resp2?.trim()) {
                throw new Error('Telefone do Responsável 2 é obrigatório');
            }
            if (!data.email_resp2?.trim()) {
                throw new Error('Email do Responsável 2 é obrigatório');
            }
            if (typeof data.usuario_id !== 'number' || isNaN(data.usuario_id)) {
                throw new Error('ID do usuário é obrigatório');
            }

            // Normaliza email
            const emailNormalizado = data.email.toLowerCase().trim();
            console.log('[SERVICE] Email normalizado:', emailNormalizado);

            // Verifica se email já existe
            console.log('[SERVICE] Verificando se email já existe...');
            const alunoExistente = await this.alunosRepository.findOne({ 
                where: { email: emailNormalizado } 
            });
            
            if (alunoExistente) {
                console.log('[SERVICE] Email já cadastrado para aluno MATRICULA:', alunoExistente.matricula);
                throw new Error(`Email ${emailNormalizado} já está cadastrado`);
            }

            // Cria usuário
            console.log('[SERVICE] Criando novo aluno...');
            const aluno = this.alunosRepository.create({
                ...data,
                email: emailNormalizado
            });

            const alunoSalvo = await this.alunosRepository.save(aluno);
            console.log('[SERVICE] Aluno criado com sucesso. MATRICULA:', alunoSalvo.matricula);
            
            return alunoSalvo;
            
        } catch (error) {
            console.error('[SERVICE] Erro ao criar aluno:', {
                error: error instanceof Error ? error.message : error,
                stack: error instanceof Error ? error.stack : undefined,
                dataRecebida: data
            });
            throw error;
        }
    }

    async findAll(): Promise<Tb_Alunos[]> {
        return await this.alunosRepository.find();
    }

    async findById(matricula: string): Promise<Tb_Alunos | null> {
        return await this.alunosRepository.findOneBy({ matricula: matricula });
    }

    async findByName(nome: string): Promise<Tb_Alunos[]> {
        return await this.alunosRepository
            .createQueryBuilder('aluno')
            .where('aluno.nome ILIKE :nome', { nome: `%${nome}%` })
            .getMany();
    }

    async findByResponsavel(nomeResponsavel: string): Promise<Tb_Alunos[]> {
        return await this.alunosRepository
            .createQueryBuilder('aluno')
            .where('aluno.resp1 ILIKE :nomeResponsavel', { nomeResponsavel: `%${nomeResponsavel}%` })
            .orWhere('aluno.resp2 ILIKE :nomeResponsavel', { nomeResponsavel: `%${nomeResponsavel}%` })
            .getMany();
    }

    async update(matricula: string, data: Partial<Tb_Alunos>): Promise<Tb_Alunos | null> {
        const aluno = await this.findById(matricula);
        if (!aluno) return null;

        Object.assign(aluno, data);
        return await this.alunosRepository.save(aluno);
    }

    async delete(matricula: number): Promise<boolean> {
        const result = await this.alunosRepository.delete(matricula);
        return result.affected !== 0;
    }
}