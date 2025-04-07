import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // ou defina um tipo mais específico se souber
        }
    }
}