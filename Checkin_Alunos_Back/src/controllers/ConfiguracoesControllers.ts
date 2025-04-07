import { Request, Response } from "express";
import { ConfiguracoesServices } from "../services/ConfiguracoesServices";

export class ConfiguracoesControllers {
    private configuracoesServices = new ConfiguracoesServices();

    async create(req: Request, res: Response) {
        try {
            const configuracao = await this.configuracoesServices.create(req.body);
            res.status(201).json(configuracao);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar configuração", error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const configuracoes = await this.configuracoesServices.findAll();
            res.status(200).json(configuracoes);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar configurações", error });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const configuracao = await this.configuracoesServices.findById(Number(req.params.id));
            if (configuracao) {
                res.status(200).json(configuracao);
            } else {
                res.status(404).json({ message: "Configuração não encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar configuração", error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedConfiguracao = await this.configuracoesServices.update(Number(req.params.id), req.body);
            res.status(200).json(updatedConfiguracao);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar configuração", error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.configuracoesServices.delete(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar configuração", error });
        }
    }
}
