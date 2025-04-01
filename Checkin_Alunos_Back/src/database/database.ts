import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env"; // Importa configurações do env.ts
import { Tb_Checkins } from "../entities/Tb_Checkins";
import { Tb_Alunos } from "../entities/tb_alunos";
import { Tb_Configuracoes } from "../entities/Tb_Configuracoes";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: false,

    logging: false,
    entities:  [Tb_Alunos, Tb_Checkins, Tb_Configuracoes],
});

AppDataSource.initialize()
    .then(() => console.log("Banco de dados conectado!"))
    .catch((error) => console.error("Erro ao conectar no banco:", error));
