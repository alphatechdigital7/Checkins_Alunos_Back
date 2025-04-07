export class CheckinsServices {
    private checkins: any[] = []; // Simulação de armazenamento em memória

    create(data: any) {
        const newCheckin = { id: this.checkins.length + 1, ...data };
        this.checkins.push(newCheckin);
        return newCheckin;
    }

    findAll() {
        console.log("Check-ins disponíveis:", this.checkins); // Log de depuração
        return this.checkins;
    }

    findById(id: number) {
        return this.checkins.find(checkin => checkin.id === id);
    }

    update(id: number, data: any) {
        const index = this.checkins.findIndex(checkin => checkin.id === id);
        if (index !== -1) {
            this.checkins[index] = { ...this.checkins[index], ...data };
            return this.checkins[index];
        }
        throw new Error("Check-in não encontrado");
    }

    delete(id: number) {
        const index = this.checkins.findIndex(checkin => checkin.id === id);
        if (index !== -1) {
            this.checkins.splice(index, 1);
            return;
        }
        throw new Error("Check-in não encontrado");
    }
}
