import { Router, Request, Response } from "express";
import { AlunosControllers } from "../controllers/AlunosControllers"; // Corrigindo a importação
import { authenticate } from "../middleware/auth"; // Importando o middleware de autenticação
import { languageMiddleware } from "../middleware/languageMiddleware"; // Importando o middleware de idioma

// Instanciando as rotas
const alunosRouter = Router();
// Instanciando o controlador
const alunosControllers = new AlunosControllers(); 

alunosRouter.use(languageMiddleware); // Usando o middleware de idioma

//Rota para criar um novo aluno
alunosRouter.post("/novo_aluno", (req: Request, res: Response) => {
    console.log('[ROTA] Dados recebidos:', req.body);
    return (alunosControllers.create as any)(req, res);
});

// Rota para listar todos os registros em alunos
alunosRouter.get("/all_alunos/", async (req: Request, res: Response) => {
    await alunosControllers.getAll(req, res);
});

// Rota para buscar aluno pela matricula
alunosRouter.get("/matricula/:matricula", async (req: Request, res: Response) => {
    await alunosControllers.getById(req, res);
});

// Rota para buscar aluno pelo nome
alunosRouter.get("/nome_alunos/", async (req: Request, res: Response) => {
    await alunosControllers.getByName(req, res);
});

// Rota para buscar aluno pelo responsavel
alunosRouter.get("/responsavel_alunos/", async (req: Request, res: Response) => {
    await alunosControllers.getByResponsavel(req, res);
});

// Rota para atualizar um aluno existente
alunosRouter.put("/:matricula", async (req: Request, res: Response) => {
    await alunosControllers.update(req, res);
});

// Rota para deletar um aluno existente
alunosRouter.delete("/:matricula", async (req: Request, res: Response) => {
    await alunosControllers.delete(req, res);
});

export default alunosRouter;
