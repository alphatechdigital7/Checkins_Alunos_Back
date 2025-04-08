import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Tb_Alunos } from "./Tb_Alunos";

//Definição da tabela checkins

@Entity("tb_checkins")
export class Tb_Checkins {
    @PrimaryGeneratedColumn ({name: "id", type: "integer" }) // Chave primária autoincrementável
    id!: number;

    @ManyToOne(() => Tb_Alunos, { onUpdate: "CASCADE", onDelete: "SET NULL" })
    @JoinColumn({ name: "aluno_matricula" })
    aluno_matricula!: Tb_Alunos;

    @CreateDateColumn({name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"}) // Data de criação
    created_at!: Date;

    @UpdateDateColumn({name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"}) // Data de criação
    updated_at!: Date;

    
}