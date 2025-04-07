import { Request, Response } from "express";
import { AlunosServices } from "../services/AlunosServices";

const alunosServices = new AlunosServices();

export class AlunosControllers {
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const aluno = await alunosServices.create(req.body);
            return res.status(201).json(aluno);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return res.status(400).json({ error: errorMessage });
        }
    };

    findAll = async (req: Request, res: Response): Promise<Response> => {
        const alunos = await alunosServices.findAll();
        return res.json(alunos);
    };

    findById = async (req: Request, res: Response): Promise<Response> => {
        const aluno = await alunosServices.findById(Number(req.params.matricula));
        if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
        return res.json(aluno);
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const aluno = await alunosServices.update(Number(req.params.matricula), req.body);
        if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
        return res.json(aluno);
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
        const success = await alunosServices.delete(Number(req.params.matricula));
        if (!success) return res.status(404).json({ error: "Aluno não encontrado" });
        return res.status(204).send();
    };
}