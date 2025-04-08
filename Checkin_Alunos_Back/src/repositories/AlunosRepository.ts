import { AppDataSource } from "../database/database";
import { Tb_Alunos } from "../entities/Tb_Alunos";
import { Repository } from "typeorm";

export const AlunosRepository: Repository<Tb_Alunos> = AppDataSource.getRepository(Tb_Alunos);
