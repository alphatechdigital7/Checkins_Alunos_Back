import { AppDataSource } from "../database/database";
import { Tb_Usuarios } from "../entities/Tb_Usuarios";
import { Repository } from "typeorm";

export const UsuariosRepository: Repository<Tb_Usuarios> = AppDataSource.getRepository(Tb_Usuarios);
