# 📚 Documentação do Projeto Checkin_Alunos

---

## 🚀 Apresentação

Este projeto **Checkin_Alunos** é uma aplicação backend desenvolvida em **TypeScript** com **Node.js** e **Express**, que gerencia informações de alunos, check-ins, configurações e usuários. A aplicação utiliza banco de dados PostgreSQL via **TypeORM** para persistência dos dados.

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior recomendada)
- npm (gerenciador de pacotes do Node.js)
- Banco de dados PostgreSQL configurado e rodando

### Passos para instalação

1. Clone o repositório do projeto.
2. Navegue até a pasta do backend:
   ```bash
   cd Checkin_Alunos_Back
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env` (baseado no arquivo `src/config/env.ts`).
5. Execute o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```
6. Para rodar em produção:
   ```bash
   npm start
   ```

---

## 📁 Estrutura de Arquivos

```
Checkin_Alunos_Back/
├── src/
│   ├── controllers/          # Lógica dos controladores para cada entidade
│   ├── database/             # Configuração do banco de dados
│   ├── entities/             # Definição das entidades do banco (models)
│   ├── middleware/           # Middlewares (autenticação, idioma, etc)
│   ├── repositories/         # Repositórios para acesso a dados
│   ├── routes/               # Definição das rotas da API
│   ├── services/             # Serviços com regras de negócio
│   ├── types/                # Tipos TypeScript customizados
│   ├── utils/                # Utilitários (ex: parser CSV)
│   ├── config/               # Configurações gerais (ex: variáveis de ambiente)
│   └── server.ts             # Arquivo principal que inicia o servidor
├── package.json              # Dependências e scripts do projeto
├── tsconfig.json             # Configuração do TypeScript
└── uploads/                  # Pasta para arquivos enviados (ex: CSV)
```

---

## 🔗 Rotas e Endpoints da API

### Alunos

| Método | Rota                  | Descrição                              |
|--------|-----------------------|--------------------------------------|
| POST   | `/novo_aluno`          | Criar um novo aluno                   |
| GET    | `/all_alunos/`         | Listar todos os alunos                |
| GET    | `/matricula/:matricula`| Buscar aluno pela matrícula           |
| GET    | `/nome_alunos/`        | Buscar aluno pelo nome                |
| GET    | `/responsavel_alunos/` | Buscar aluno pelo responsável        |
| PUT    | `/:matricula`          | Atualizar dados do aluno pela matrícula |
| DELETE | `/:matricula`          | Deletar aluno pela matrícula          |
| POST   | `/import`              | Importar alunos via arquivo CSV       |

---

### Checkins

| Método | Rota       | Descrição                  |
|--------|------------|----------------------------|
| POST   | `/`        | Criar um novo checkin      |
| GET    | `/`        | Listar todos os checkins   |
| GET    | `/:id`     | Buscar checkin pelo ID     |
| PUT    | `/:id`     | Atualizar checkin pelo ID  |
| DELETE | `/:id`     | Deletar checkin pelo ID    |

---

### Configurações

| Método | Rota       | Descrição                    |
|--------|------------|------------------------------|
| POST   | `/`        | Criar nova configuração       |
| GET    | `/`        | Listar todas as configurações |
| GET    | `/:id`     | Buscar configuração pelo ID   |
| PUT    | `/:id`     | Atualizar configuração pelo ID|
| DELETE | `/:id`     | Deletar configuração pelo ID  |

---

### Usuários

| Método | Rota           | Descrição                      |
|--------|----------------|--------------------------------|
| POST   | `/novo_usuario` | Criar novo usuário             |
| GET    | `/all_usuarios/`| Listar todos os usuários       |
| GET    | `/id/:id`      | Buscar usuário pelo ID         |
| GET    | `/nome_usuarios/`| Buscar usuário pelo nome      |
| PUT    | `/:id`         | Atualizar usuário pelo ID      |
| DELETE | `/:id`         | Deletar usuário pelo ID        |

---

## 💡 Observações Finais

- As rotas utilizam middlewares para autenticação e suporte a múltiplos idiomas.
- Para importar alunos via CSV, utilize a rota `/import` enviando o arquivo no campo `file`.
- O backend está preparado para ser consumido por um frontend separado (não presente neste repositório).
- Utilize ferramentas como Postman ou Insomnia para testar as rotas da API.

---

> Desenvolvido com ❤️ para facilitar o gerenciamento de alunos e checkins.
