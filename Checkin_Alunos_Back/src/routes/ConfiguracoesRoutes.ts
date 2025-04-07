import { Router } from "express";
import { ConfiguracoesControllers } from "../controllers/ConfiguracoesControllers";

const configuracoesRoutes = Router();
const configuracoesControllers = new ConfiguracoesControllers();

configuracoesRoutes.post("/", configuracoesControllers.create);
configuracoesRoutes.get("/", configuracoesControllers.findAll);
configuracoesRoutes.get("/:id", configuracoesControllers.findById);
configuracoesRoutes.put("/:id", configuracoesControllers.update);
configuracoesRoutes.delete("/:id", configuracoesControllers.delete);

export { configuracoesRoutes };
