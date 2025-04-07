import { Request, Response } from "express";
import { CheckinsServices } from "../services/CheckinsServices";

export class CheckinsControllers {
    private checkinsServices = new CheckinsServices();

    async create(req: Request, res: Response) {
        console.log("Dados recebidos para criação:", req.body); // Log de depuração
        try {
            const checkin = await this.checkinsServices.create(req.body);
            res.status(201).json(checkin);
        } catch (error) {
            console.error("Erro ao criar check-in:", error); // Log de erro
            res.status(500).json({ message: "Erro ao criar check-in", error });
        }
    }

    async findAll(req: Request, res: Response) {
        console.log("Buscando todos os check-ins"); // Log de depuração
        try {
            const checkins = await this.checkinsServices.findAll();
            console.log("Check-ins disponíveis:", checkins); // Log de depuração
            res.status(200).json(checkins);
        } catch (error) {
            console.error("Erro ao buscar check-ins:", error); // Log de erro
            res.status(500).json({ message: "Erro ao buscar check-ins", error });
        }
    }

    async findById(req: Request, res: Response) {
        console.log("Buscando check-in com ID:", req.params.id); // Log de depuração
        try {
            const checkin = await this.checkinsServices.findById(Number(req.params.id));
            if (checkin) {
                res.status(200).json(checkin);
            } else {
                res.status(404).json({ message: "Check-in não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao buscar check-in:", error); // Log de erro
            res.status(500).json({ message: "Erro ao buscar check-in", error });
        }
    }

    async update(req: Request, res: Response) {
        console.log("Atualizando check-in com ID:", req.params.id, "Dados:", req.body); // Log de depuração
        try {
            const updatedCheckin = await this.checkinsServices.update(Number(req.params.id), req.body);
            res.status(200).json(updatedCheckin);
        } catch (error) {
            console.error("Erro ao atualizar check-in:", error); // Log de erro
            res.status(500).json({ message: "Erro ao atualizar check-in", error });
        }
    }

    async delete(req: Request, res: Response) {
        console.log("Deletando check-in com ID:", req.params.id); // Log de depuração
        try {
            await this.checkinsServices.delete(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar check-in:", error); // Log de erro
            res.status(500).json({ message: "Erro ao deletar check-in", error });
        }
    }

    // Método para adicionar um check-in de exemplo
    async addExampleCheckin() {
        const exampleCheckin = { name: "Exemplo", date: new Date() };
        console.log("Adicionando check-in de exemplo:", exampleCheckin); // Log para depuração
        const createdCheckin = await this.checkinsServices.create(exampleCheckin);
        console.log("Check-in de exemplo criado:", createdCheckin); // Log para depuração
    }
}

// Adicionando um check-in de exemplo ao iniciar o controlador
const checkinsControllers = new CheckinsControllers();
checkinsControllers.addExampleCheckin();
