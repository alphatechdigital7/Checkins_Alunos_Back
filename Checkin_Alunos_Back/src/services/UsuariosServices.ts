import { AppDataSource } from "../database/database";  // Importa a fonte de dados configurada (DataSource)
import { Tb_Usuarios } from "../entities/Tb_Usuarios";   // Importa a entidade de usuários para realizar as operações no banco

// Serviço para gerenciar operações relacionadas a usuários.

export class UsuariosServices {
    private usuariosRepository = AppDataSource.getRepository(Tb_Usuarios);

    async create(data: Partial<Tb_Usuarios>): Promise<Tb_Usuarios> {
        try {
            console.log('[SERVICE] Iniciando criação de usuário com dados:', data);

            // Valida campos obrigatórios
            if (!data.nome?.trim()) {
                throw new Error('Nome é obrigatório');
            }
            if (!data.email?.trim()) {
                throw new Error('Email é obrigatório');
            }
            if (!data.senha?.trim()) {
                throw new Error('Senha é obrigatória');
            }

            // Normaliza email
            const emailNormalizado = data.email.toLowerCase().trim();
            console.log('[SERVICE] Email normalizado:', emailNormalizado);

            // Verifica se email já existe
            console.log('[SERVICE] Verificando se email já existe...');
            const usuarioExistente = await this.usuariosRepository.findOne({ 
                where: { email: emailNormalizado } 
            });
            
            if (usuarioExistente) {
                console.log('[SERVICE] Email já cadastrado para usuário ID:', usuarioExistente.id_usuarios);
                throw new Error(`Email ${emailNormalizado} já está cadastrado`);
            }

            // Cria usuário
            console.log('[SERVICE] Criando novo usuário...');
            const usuario = this.usuariosRepository.create({
                ...data,
                email: emailNormalizado
            });

            const usuarioSalvo = await this.usuariosRepository.save(usuario);
            console.log('[SERVICE] Usuário criado com sucesso. ID:', usuarioSalvo.id_usuarios);
            
            return usuarioSalvo;
            
        } catch (error) {
            console.error('[SERVICE] Erro ao criar usuário:', {
                error: error instanceof Error ? error.message : error,
                stack: error instanceof Error ? error.stack : undefined,
                dataRecebida: data
            });
            throw error;
        }
    }

    async findAll(): Promise<Tb_Usuarios[]> {
        return await this.usuariosRepository.find();
    }

    async findById(id: number): Promise<Tb_Usuarios | null> {
        return await this.usuariosRepository.findOneBy({ id_usuarios: id });
    }

    async findByName(nome: string): Promise<Tb_Usuarios[]> {
        return await this.usuariosRepository
            .createQueryBuilder('usuario')
            .where('usuario.nome ILIKE :nome', { nome: `%${nome}%` })
            .getMany();
    }

    async update(id: number, data: Partial<Tb_Usuarios>): Promise<Tb_Usuarios | null> {
        const usuario = await this.findById(id);
        if (!usuario) return null;

        Object.assign(usuario, data);
        return await this.usuariosRepository.save(usuario);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.usuariosRepository.delete(id);
        return result.affected !== 0;
    }
}