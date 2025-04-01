import { Request, Response } from "express";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Teste simples de resposta
app.get("/", (req: Request, res: Response) => {
    res.send("Servidor funcionando!");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


