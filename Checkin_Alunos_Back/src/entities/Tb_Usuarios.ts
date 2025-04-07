import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";


// Definição da tabela usuários
@Entity("tb_usuarios")
export class Tb_Usuarios{
    // Chave Primária autoincrement
    @PrimaryGeneratedColumn({name: "id_usuarios", type: "integer"})
    id_usuarios!: number;

    // Coluna nome do usuário
    @Column({name: "nome", type: "character varying"})
    nome!: string;

    // Coluna email do usuário
    @Column({name: "email", type: "character varying"})
    email!: string;

    // Coluna senha do usuário
    @Column({name: "senha", type: "character varying"})
    senha!: string;

    //Coluna Data da criação 
    @CreateDateColumn({name: "created_at", type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    created_at!: Date;

    // Coluna Data da atualização
    @UpdateDateColumn({name: "updated_at", type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updated_at!: Date;

    // @BeforeInsert()  // Comentado para desabilitar temporariamente o hash da senha
    // async hashPassword() {
    // this.senha = await bcrypt.hash(this.senha, 10);
    // }



}