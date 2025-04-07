import { Router } from "express";
import { CheckinsControllers } from "../controllers/CheckinsControllers";

const checkinsRoutes = Router();
const checkinsControllers = new CheckinsControllers();

checkinsRoutes.post("/", checkinsControllers.create.bind(checkinsControllers));
checkinsRoutes.get("/", checkinsControllers.findAll.bind(checkinsControllers));
checkinsRoutes.get("/:id", checkinsControllers.findById.bind(checkinsControllers));
checkinsRoutes.put("/:id", checkinsControllers.update.bind(checkinsControllers));
checkinsRoutes.delete("/:id", checkinsControllers.delete.bind(checkinsControllers));

export { checkinsRoutes };
