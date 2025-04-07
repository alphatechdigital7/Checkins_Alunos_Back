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
            const usuario = await usuariosServices.create(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            return res.status(400).json({ error: errorMessage });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const usuarios = await usuariosServices.findAll();
        return res.json(usuarios);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const usuario = await usuariosServices.findById(Number(req.params.id));
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
        return res.json(usuario);
    }

    async getByName(req: Request, res: Response): Promise<Response> {
        const { nome } = req.query;
        const usuarios = await usuariosServices.findByName(nome as string);
        return res.json(usuarios);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const usuario = await usuariosServices.update(Number(req.params.id), req.body);
        if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
        return res.json(usuario);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const success = await usuariosServices.delete(Number(req.params.id));
        if (!success) return res.status(404).json({ error: "Usuário não encontrado" });
        return res.status(204).send();
    }
}