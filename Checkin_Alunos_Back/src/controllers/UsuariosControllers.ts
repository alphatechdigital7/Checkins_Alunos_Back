import { Request, Response } from "express";
import { UsuariosServices } from "../services/UsuariosServices";

const usuariosServices = new UsuariosServices();

export class UsuariosControllers {
    constructor() {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Dados recebidos para criação:', req.body);
            // Garante que estamos trabalhando com um único usuário
            const dadosUsuario = Array.isArray(req.body) ? req.body[0] : req.body;
            const usuario = await usuariosServices.create(dadosUsuario);
            
            console.log('Usuário criado com ID:', usuario.id_usuarios);
            return res.status(201).json({
                success: true,
                usuario,
                mensagem: "Usuário criado com sucesso"
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error('Erro no controller ao criar usuário:', errorMessage);
            
            return res.status(400).json({ 
                success: false,
                error: errorMessage,
                mensagem: "Falha ao criar usuário",
                detalhes: {
                    campoEmail: errorMessage.includes('Email') ? 'email inválido' : undefined,
                    camposFaltantes: errorMessage.includes('obrigatórios') 
                        ? ['nome', 'email', 'senha'].filter(f => !req.body[f])
                        : undefined
                }
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await usuariosServices.findAll();
            return res.json(
                //{
                //success: true,
                //message: "Lista de usuários obtida com sucesso",
                //data: usuarios
                //}
                usuarios, 
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar usuários"
            });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const usuario = await usuariosServices.findById(Number(req.params.id));
            if (!usuario) return res.status(404).json({ 
                success: false,
                error: "Usuário não encontrado" 
            });
            return res.json({
                success: true,
                message: "Usuário encontrado com sucesso",
                data: usuario
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar usuário"
            });
        }
    }

    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;
            const usuarios = await usuariosServices.findByName(nome as string);
            return res.json({
                success: true,
                message: "Usuários encontrados com sucesso",
                data: usuarios
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar usuários por nome"
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const dadosAtualizacao = Array.isArray(req.body) ? req.body[0] : req.body;
            
            const usuario = await usuariosServices.update(Number(req.params.id), dadosAtualizacao);
            if (!usuario) return res.status(404).json({ 
                success: false,
                error: "Usuário não encontrado" 
            });
            
            return res.json({
                success: true,
                message: "Usuário atualizado com sucesso",
                data: usuario
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao atualizar usuário"
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const success = await usuariosServices.delete(Number(req.params.id));
            if (!success) return res.status(404).json({ 
                success: false,
                error: "Usuário não encontrado" 
            });
            return res.json({
                success: true,
                message: "Usuário deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao deletar usuário"
            });
        }
    }
}