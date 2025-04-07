// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const SECRET_KEY = env.SECRET_KEY || ''; // chave secreta utilizada para authentication do token


// Middleware de autenticação
export const authenticate = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {

    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho

    if (!token) {
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
    }

    // Verifica e decodifica o token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido." });
        }
        req.user = decoded; // Armazena os dados do usuário decodificados na requisição
        next(); // Chama o próximo middleware ou rota
    });
};
