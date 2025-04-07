export class AlunosServices {
    private alunos: any[] = []; // Simulação de armazenamento em memória

    create(data: any) {
        const newAluno = { id: this.alunos.length + 1, ...data };
        this.alunos.push(newAluno);
        return newAluno;
    }

    findAll() {
        return this.alunos;
    }

    findById(id: number) {
        return this.alunos.find(aluno => aluno.id === id);
    }

    update(id: number, data: any) {
        const index = this.alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            this.alunos[index] = { ...this.alunos[index], ...data };
            return this.alunos[index];
        }
        return null; // Retorna null se o aluno não for encontrado
    }

    delete(id: number): boolean {
        const index = this.alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            this.alunos.splice(index, 1);
            return true; // Retorna true se a deleção for bem-sucedida
        }
        return false; // Retorna false se o aluno não for encontrado
    }

    findByName(name: string) {
        return this.alunos.filter(aluno => aluno.name.toLowerCase().includes(name.toLowerCase()));
    }
}
