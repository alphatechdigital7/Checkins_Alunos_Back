import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export function multerErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError) {
        // Erro específico do multer
        return res.status(400).json({
            success: false,
            error: 'Erro no upload do arquivo: ' + err.message,
            message: 'Verifique se o campo do arquivo está correto e se o arquivo atende aos requisitos.'
        });
    }
    next(err);
}
