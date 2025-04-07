export class ConfiguracoesServices {
    private configuracoes: any[] = []; // Simulação de armazenamento em memória

    create(data: any) {
        const newConfiguracao = { id: this.configuracoes.length + 1, ...data };
        this.configuracoes.push(newConfiguracao);
        return newConfiguracao;
    }

    findAll() {
        return this.configuracoes;
    }

    findById(id: number) {
        return this.configuracoes.find(configuracao => configuracao.id === id);
    }

    update(id: number, data: any) {
        const index = this.configuracoes.findIndex(configuracao => configuracao.id === id);
        if (index !== -1) {
            this.configuracoes[index] = { ...this.configuracoes[index], ...data };
            return this.configuracoes[index];
        }
        throw new Error("Configuração não encontrada");
    }

    delete(id: number) {
        const index = this.configuracoes.findIndex(configuracao => configuracao.id === id);
        if (index !== -1) {
            this.configuracoes.splice(index, 1);
            return;
        }
        throw new Error("Configuração não encontrada");
    }
}
