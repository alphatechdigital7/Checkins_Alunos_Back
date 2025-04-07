import { UsuariosServices } from "./src/services/UsuariosServices";
import { AppDataSource } from "./src/database/database";

async function test() {
  await AppDataSource.initialize();
  const service = new UsuariosServices();
  
  try {
    const usuario = await service.create({
      nome: "Teste Debug",
      email: "debug@teste.com",
      senha: "123456"
    });
    console.log('Usuário criado com sucesso:', usuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

test();
