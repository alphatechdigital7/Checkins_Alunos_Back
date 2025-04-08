import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env"; // Importa configurações do env.ts
import { Tb_Checkins } from "../entities/Tb_Checkins";
import { Tb_Alunos } from "../entities/Tb_Alunos";
import { Tb_Configuracoes } from "../entities/Tb_Configuracoes";
import { Tb_Usuarios } from "../entities/Tb_Usuarios";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    synchronize: false,

    logging: false,
    entities:  [Tb_Alunos, Tb_Checkins, Tb_Configuracoes, Tb_Usuarios],
});

AppDataSource.initialize()
    .then(() => console.log("Banco de dados conectado!"))
    .catch((error) => console.error("Erro ao conectar no banco:", error));
