import multer from 'multer';
import { multerErrorHandler } from '../middleware/multerErrorHandler';
import { Router, Request, Response, NextFunction } from "express";
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

// Rota para importar alunos de arquivo CSV
const upload = multer({ 
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const isCsv = file.mimetype === 'text/csv' || 
                     file.originalname.endsWith('.csv');
        
        if (isCsv) {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos .csv são permitidos'));
        }
    }
});

import { ErrorRequestHandler } from "express";


alunosRouter.post("/import", upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await alunosControllers.importFromCsv(req, res);
    } catch (error: unknown) {
        next(error);
    }
});
export default alunosRouter;
