import { UsuariosServices } from "./services/UsuariosServices";
import { AppDataSource } from "./database/database";

async function test() {
  try {
    console.log("Inicializando conexão com o banco...");
    await AppDataSource.initialize();
    
    const service = new UsuariosServices();
    console.log("Serviço de usuários inicializado");

    console.log("Criando usuário de teste...");
    const usuario = await service.create({
      nome: "Teste Debug",
      email: "debug@teste.com",
      senha: "123456"
    });
    
    console.log('SUCESSO - Usuário criado:', {
      id: usuario.id_usuarios,
      nome: usuario.nome,
      email: usuario.email
    });
    
  } catch (error) {
    console.error('ERRO:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } finally {
    await AppDataSource.destroy();
    console.log("Conexão com o banco encerrada");
  }
}

test();
