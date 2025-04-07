import dotenv from 'dotenv';

dotenv.config();

export const env = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER , //por questões de segurança, USUARIO informado apenas no arquivo .env
    DB_PASS: process.env.DB_PASS , // por questões de segurança, PASSWORD informado apenas no arquivo .env
    DB_NAME: process.env.DB_NAME || 'CHECKIN_ALUNOS_DB',
    DB_PORT: process.env.DB_PORT || '5432',

    SECRET_KEY: process.env.SECRET_KEY // por questões de segurança, SECRET_KEY informada apenas no arquivo .env
};