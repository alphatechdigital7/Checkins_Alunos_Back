# 📚 Checkin_Alunos Project Documentation

---

## 🚀 Introduction

This **Checkin_Alunos** project is a backend application developed in **TypeScript** with **Node.js** and **Express**, managing students, check-ins, configurations, and users. It uses a PostgreSQL database with **TypeORM** for data persistence.

---

## ⚙️ Installation and Running

### Prerequisites

- Node.js (recommended version 16 or higher)
- npm (Node.js package manager)
- PostgreSQL database configured and running

### Installation Steps

1. Clone the project repository.
2. Navigate to the backend folder:
   ```bash
   cd Checkin_Alunos_Back
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables in the `.env` file (based on `src/config/env.ts`).
5. Run the server in development mode:
   ```bash
   npm run dev
   ```
6. To run in production:
   ```bash
   npm start
   ```

---

## 📁 File Structure

```
Checkin_Alunos_Back/
├── src/
│   ├── controllers/          # Controllers logic for each entity
│   ├── database/             # Database configuration
│   ├── entities/             # Database entities (models)
│   ├── middleware/           # Middlewares (authentication, language, etc)
│   ├── repositories/         # Data access repositories
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic services
│   ├── types/                # Custom TypeScript types
│   ├── utils/                # Utilities (e.g., CSV parser)
│   ├── config/               # General configurations (e.g., environment variables)
│   └── server.ts             # Main file to start the server
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── uploads/                  # Folder for uploaded files (e.g., CSV)
```

---

## 🔗 API Routes and Endpoints

### Students (Alunos)

| Method | Route                  | Description                          |
|--------|------------------------|------------------------------------|
| POST   | `/novo_aluno`           | Create a new student                |
| GET    | `/all_alunos/`          | List all students                  |
| GET    | `/matricula/:matricula` | Get student by matricula           |
| GET    | `/nome_alunos/`         | Get student by name                |
| GET    | `/responsavel_alunos/`  | Get student by responsible person  |
| PUT    | `/:matricula`           | Update student by matricula        |
| DELETE | `/:matricula`           | Delete student by matricula        |
| POST   | `/import`               | Import students via CSV file       |

---

### Checkins

| Method | Route   | Description                  |
|--------|---------|------------------------------|
| POST   | `/`     | Create a new checkin          |
| GET    | `/`     | List all checkins             |
| GET    | `/:id`  | Get checkin by ID             |
| PUT    | `/:id`  | Update checkin by ID          |
| DELETE | `/:id`  | Delete checkin by ID          |

---

### Configurations

| Method | Route   | Description                    |
|--------|---------|-------------------------------|
| POST   | `/`     | Create a new configuration     |
| GET    | `/`     | List all configurations        |
| GET    | `/:id`  | Get configuration by ID        |
| PUT    | `/:id`  | Update configuration by ID     |
| DELETE | `/:id`  | Delete configuration by ID     |

---

### Users (Usuários)

| Method | Route             | Description                    |
|--------|-------------------|-------------------------------|
| POST   | `/novo_usuario`    | Create a new user              |
| GET    | `/all_usuarios/`  | List all users                 |
| GET    | `/id/:id`         | Get user by ID                |
| GET    | `/nome_usuarios/` | Get user by name              |
| PUT    | `/:id`            | Update user by ID             |
| DELETE | `/:id`            | Delete user by ID             |

---

## 💡 Final Notes

- Routes use middlewares for authentication and multi-language support.
- To import students via CSV, use the `/import` route sending the file in the `file` field.
- The backend is designed to be consumed by a separate frontend (not included in this repository).
- Use tools like Postman or Insomnia to test the API routes.

---

> Developed with ❤️ to facilitate student and checkin management.
