import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/UsuariosRoutes";
import alunosRoutes from "./routes/AlunosRoutes";
import { configuracoesRoutes } from "./routes/ConfiguracoesRoutes";
import { checkinsRoutes } from "./routes/CheckinsRoutes";

const app = express();

//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // ou a porta onde seu front está rodando
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));



app.use(express.json()); // Middleware para analisar JSON
app.use(express.urlencoded({ extended: true }));

app.use("/usuarios", usuariosRoutes); // Registrando as rotas de usuários
app.use("/alunos", alunosRoutes); // Registrando as rotas de alunos
app.use("/configuracoes", configuracoesRoutes); // Registrando as rotas de configurações
app.use("/checkins", checkinsRoutes); // Registrando as rotas de check-ins

// Teste simples de resposta
app.get("/", (req: Request, res: Response) => {
    res.send("Servidor funcionando!");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
