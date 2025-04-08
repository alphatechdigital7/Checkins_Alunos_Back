import { Request, Response } from "express";
import { AlunosServices } from "../services/AlunosServices";

const alunosServices = new AlunosServices();

export class AlunosControllers {
    constructor() {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByResponsavel = this.getByResponsavel.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Dados recebidos para criação:', req.body);
            // Garante que estamos trabalhando com um único usuário
            const dadosAluno = Array.isArray(req.body) ? req.body[0] : req.body;
            const aluno = await alunosServices.create(dadosAluno);
            
            console.log('Aluno criado com MATRICULA:', aluno.matricula);
            return res.status(201).json({
                success: true,
                aluno,
                mensagem: "Aluno criado com sucesso"
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error('Erro no controller ao criar aluno:', errorMessage);
            
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
            const alunos = await alunosServices.findAll();
            return res.json(
                //{
                //success: true,
                //message: "Lista de usuários obtida com sucesso",
                //data: usuarios
                //}
                alunos, 
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos"
            });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const aluno = await alunosServices.findById(Number(req.params.matricula));
            if (!aluno) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            return res.json({
                success: true,
                message: "Aluno encontrado com sucesso",
                data: aluno
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar aluno"
            });
        }
    }

    async getByName(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;
            const alunos = await alunosServices.findByName(nome as string);
            return res.json({
                success: true,
                message: "Alunos encontrados com sucesso",
                data: alunos
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos por nome"
            });
        }
    }
    async getByResponsavel(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;
            const alunos = await alunosServices.findByName(nome as string);
            return res.json({
                success: true,
                message: "Alunos encontrados com sucesso",
                data: alunos
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao buscar alunos pelo Responsável"
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const dadosAtualizacao = Array.isArray(req.body) ? req.body[0] : req.body;
            
            const aluno = await alunosServices.update(Number(req.params.matricula), dadosAtualizacao);
            if (!aluno) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            
            return res.json({
                success: true,
                message: "Aluno atualizado com sucesso",
                data: aluno
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao atualizar Aluno"
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const success = await alunosServices.delete(Number(req.params.matricula));
            if (!success) return res.status(404).json({ 
                success: false,
                error: "Aluno não encontrado" 
            });
            return res.json({
                success: true,
                message: "Aluno deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Erro ao deletar Aluno"
            });
        }
    }
}