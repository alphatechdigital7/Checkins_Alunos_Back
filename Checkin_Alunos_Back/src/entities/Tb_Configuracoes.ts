import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

// Definiçaão da tabela configurações

@Entity("tb_configuracoes")
export class Tb_Configuracoes {
    @PrimaryGeneratedColumn({name: "id", type: "integer"})
    id!: number;

    @Column({name: "horario_limite", type: "time", nullable: false})
    horario_limite!: string;
    
    @Column({ name: "intervalo_espera", type: "interval", nullable: false })
    intervalo_espera!: string;
    
    @CreateDateColumn({ name: "creatad_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at!: Date;

}
