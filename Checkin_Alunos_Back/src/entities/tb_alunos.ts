import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Tb_Usuarios } from "./Tb_Usuarios";

// Definição tabela alunos

@Entity ("tb_alunos")
export class Tb_Alunos {
    @PrimaryGeneratedColumn({name: "matricula", type: "integer"})
    matricula!: number;

    @Column({name: "nome", type: "character varying"})
    nome!: string;

    @Column({name: "telefone", type: "character varying"})
    telefone!: string;

    @Column({name: "email", type: "character varying"})
    email!: string;

    @Column({name: "resp1", type: "character varying"})
    resp1!: string;

    @Column({name: "telefone_resp1", type: "character varying"})
    telefone_resp1!: string;

    @Column({name: "email_resp1", type: "character varying"})
    email_resp1!: string;

    @Column({name: "resp2", type: "character varying"})
    resp2!: string;

    @Column({name: "telefone_resp2", type: "character varying"})
    telefone_resp2!: string;

    @Column({name: "email_resp2", type: "character varying"})
    email_resp2!: string;

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    created_at!: Date;

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updated_at!: Date;

    @ManyToOne(() => Tb_Usuarios, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    @JoinColumn({name: "usuarios_id"})
    usuario_id!: Tb_Usuarios;


}
