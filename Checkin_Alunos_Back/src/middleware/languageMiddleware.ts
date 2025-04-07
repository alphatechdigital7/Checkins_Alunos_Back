import { Request, Response, NextFunction } from "express";

// Extendendo a interface Request do Express
declare module 'express' {
    interface Request {
        language?: string;
    }
}

export function languageMiddleware(req: Request, res: Response, next: NextFunction) {
    const language = req.headers['accept-language'] || 'pt'; // Padrão para português
    req.language = language; // Armazenar o idioma na requisição
    next();
}
