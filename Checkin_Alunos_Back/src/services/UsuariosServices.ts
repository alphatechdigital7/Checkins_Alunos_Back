import { AppDataSource } from "../database/database";  // Importa a fonte de dados configurada (DataSource)
import { Tb_Usuarios } from "../entities/Tb_Usuarios";   // Importa a entidade de usuários para realizar as operações no banco

// Serviço para gerenciar operações relacionadas a usuários.

export class UsuariosServices {
    private usuariosRepository = AppDataSource.getRepository(Tb_Usuarios);

    async create(data: Partial<Tb_Usuarios>): Promise<Tb_Usuarios> {
        const usuario = this.usuariosRepository.create(data);
        return await this.usuariosRepository.save(usuario);
    }

    async findAll(): Promise<Tb_Usuarios[]> {
        return await this.usuariosRepository.find();
    }

    async findById(id: number): Promise<Tb_Usuarios | null> {
        return await this.usuariosRepository.findOneBy({ id_usuarios: id });
    }

    async findByName(nome: string): Promise<Tb_Usuarios[]> {
        return await this.usuariosRepository.find({ where: { nome } });
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