import { Router, Request, Response } from "express";
import { AlunosControllers } from "../controllers/AlunosControllers";

const alunosRoutes = Router();
const alunosControllers = new AlunosControllers();

alunosRoutes.post("/", async (req: Request, res: Response) => {
    try {
        await alunosControllers.create(req, res);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar aluno", error });
    }
});

alunosRoutes.get("/", async (req: Request, res: Response) => {
    try {
        await alunosControllers.findAll(req, res);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar alunos", error });
    }
});

alunosRoutes.get("/:matricula", async (req: Request, res: Response) => {
    try {
        await alunosControllers.findById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar aluno", error });
    }
});

alunosRoutes.put("/:matricula", async (req: Request, res: Response) => {
    try {
        await alunosControllers.update(req, res);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar aluno", error });
    }
});

alunosRoutes.delete("/:matricula", async (req: Request, res: Response) => {
    try {
        await alunosControllers.delete(req, res);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar aluno", error });
    }
});

export { alunosRoutes };
