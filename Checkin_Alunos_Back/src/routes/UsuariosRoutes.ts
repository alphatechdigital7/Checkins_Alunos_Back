import { Router, Request, Response } from "express";
import { UsuariosControllers } from "../controllers/UsuariosControllers"; // Corrigindo a importação
import { authenticate } from "../middleware/auth"; // Importando o middleware de autenticação
import { languageMiddleware } from "../middleware/languageMiddleware"; // Importando o middleware de idioma

// Instanciando as rotas
const usuariosRouter = Router();
// Instanciando o controlador
const usuariosControllers = new UsuariosControllers(); 

usuariosRouter.use(languageMiddleware); // Usando o middleware de idioma

//Rota para criar um novo usuário
usuariosRouter.post("/novo_usuario", async (req: Request, res: Response) => {
    await usuariosControllers.create(req, res);
});

// Rota para listar todos os registros em usuários
usuariosRouter.get("/all_usuarios/", async (req: Request, res: Response) => {
    await usuariosControllers.getAll(req, res);
});

// Rota para buscar usuário pelo ID
usuariosRouter.get("/id/:id", async (req: Request, res: Response) => {
    await usuariosControllers.getById(req, res);
});

// Rota para buscar usuário pelo nome
usuariosRouter.get("/nome_usuarios/", async (req: Request, res: Response) => {
    await usuariosControllers.getByName(req, res);
});

// Rota para atualizar um usuário existente
usuariosRouter.put("/:id", async (req: Request, res: Response) => {
    await usuariosControllers.update(req, res);
});

// Rota para deletar um usuário existente
usuariosRouter.delete("/:id", async (req: Request, res: Response) => {
    await usuariosControllers.delete(req, res);
});

export default usuariosRouter;