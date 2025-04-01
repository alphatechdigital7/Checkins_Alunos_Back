-- SCRIPT CRIAÇÃO BANCO DE DADOS PROJETO CHECKIN_ALUNOS


-- Tabela Usuários
CREATE TABLE tb_usuarios(
	id_usuarios SERIAL PRIMARY KEY,
	nome CHARACTER VARYING (100) NOT NULL,
	email CHARACTER VARYING (100) NOT NULL UNIQUE,
	senha CHARACTER VARYING (255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de alunos
CREATE TABLE tb_alunos (
    matricula BIGINT PRIMARY KEY,
    nome CHARACTER VARYING(255) NOT NULL,
    telefone CHARACTER VARYING(20),
    email CHARACTER VARYING(255),
    resp1 CHARACTER VARYING(255) NOT NULL,
    telefone_resp1 CHARACTER VARYING(20),
    email_resp1 CHARACTER VARYING(255),
    resp2 CHARACTER VARYING(255) NOT NULL,
    telefone_resp2 CHARACTER VARYING(20),
    email_resp2 CHARACTER VARYING(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	usuarios_id INTEGER,
	CONSTRAINT tb_alunos_usuarios_id_fkey FOREIGN KEY (usuarios_id) 
	REFERENCES public.tb_usuarios(id_usuarios) MATCH SIMPLE 
	ON UPDATE CASCADE
	ON DELETE SET NULL
);

-- Tabela de check-in dos alunos
CREATE TABLE tb_checkins (
    id SERIAL PRIMARY KEY,
    alunos_matricula BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	usuarios_id INTEGER,
	CONSTRAINT tb_checkins_alunos_matricula_fkey FOREIGN KEY (alunos_matricula)
	REFERENCES tb_alunos(matricula) MATCH SIMPLE
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	CONSTRAINT tb_checkins_usuarios_id_fkey FOREIGN KEY (usuarios_id) 
	REFERENCES tb_usuarios(id_usuarios) MATCH SIMPLE
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

-- Tabela de configurações do sistema (para parametrização de horário limite e intervalo de espera)
CREATE TABLE tb_configuracoes (
    id SERIAL PRIMARY KEY,
    horario_limite TIME NOT NULL,
    intervalo_espera INTERVAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	usuarios_id INTEGER,
	CONSTRAINT tb_configuracoes_usuarios_id_fkey FOREIGN KEY (usuarios_id) 
	REFERENCES tb_usuarios(id_usuarios) MATCH SIMPLE
	ON DELETE SET NULL
	ON UPDATE CASCADE
);
