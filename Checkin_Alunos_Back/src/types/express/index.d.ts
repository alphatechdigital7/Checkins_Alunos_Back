import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            language?: string; // Adicionando a propriedade language
        }
    }
}