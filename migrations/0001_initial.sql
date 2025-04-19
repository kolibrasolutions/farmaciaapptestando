-- Migration number: 0001 	 2025-04-18T23:12:10.000Z
-- Banco de dados para aplicativo de treinamento de balconistas de farmácia

-- Remover tabelas existentes se necessário
DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS quiz_questions;
DROP TABLE IF EXISTS medicamentos;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS publicos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS farmacias;
DROP TABLE IF EXISTS assinaturas;

-- Tabela de farmácias
CREATE TABLE IF NOT EXISTS farmacias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  endereco TEXT,
  telefone TEXT,
  email TEXT UNIQUE NOT NULL,
  plano TEXT CHECK(plano IN ('basico', 'intermediario', 'premium')) NOT NULL DEFAULT 'basico',
  status TEXT CHECK(status IN ('ativo', 'inativo', 'pendente', 'cancelado')) NOT NULL DEFAULT 'pendente',
  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de assinaturas
CREATE TABLE IF NOT EXISTS assinaturas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmacia_id INTEGER NOT NULL,
  plano TEXT CHECK(plano IN ('basico', 'intermediario', 'premium')) NOT NULL,
  data_inicio DATETIME NOT NULL,
  data_fim DATETIME NOT NULL,
  valor REAL NOT NULL,
  status TEXT CHECK(status IN ('ativa', 'cancelada', 'pendente', 'expirada')) NOT NULL DEFAULT 'pendente',
  max_usuarios INTEGER NOT NULL DEFAULT 5,
  FOREIGN KEY (farmacia_id) REFERENCES farmacias (id)
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmacia_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  cargo TEXT,
  role TEXT CHECK(role IN ('admin', 'gerente', 'balconista')) NOT NULL DEFAULT 'balconista',
  status TEXT CHECK(status IN ('ativo', 'inativo', 'pendente')) NOT NULL DEFAULT 'pendente',
  ultimo_acesso DATETIME,
  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmacia_id) REFERENCES farmacias (id)
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE NOT NULL,
  descricao TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de públicos
CREATE TABLE IF NOT EXISTS publicos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT UNIQUE NOT NULL,
  descricao TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoria_id INTEGER NOT NULL,
  publico_id INTEGER NOT NULL,
  codigo TEXT UNIQUE NOT NULL,
  queixa TEXT NOT NULL,
  resposta TEXT NOT NULL,
  opcoes_alternativas TEXT,
  tags TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias (id),
  FOREIGN KEY (publico_id) REFERENCES publicos (id)
);

-- Tabela de perguntas de quiz
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoria_id INTEGER NOT NULL,
  nivel TEXT CHECK(nivel IN ('facil', 'medio', 'dificil')) NOT NULL,
  pergunta TEXT NOT NULL,
  opcoes TEXT NOT NULL,
  resposta_correta INTEGER NOT NULL,
  explicacao TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

-- Tabela de medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  principio_ativo TEXT NOT NULL,
  apresentacoes TEXT,
  posologia TEXT,
  indicacoes TEXT,
  contraindicacoes TEXT,
  efeitos_colaterais TEXT,
  categorias_ids TEXT,
  publicos_ids TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de progresso do usuário
CREATE TABLE IF NOT EXISTS user_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  flashcards_vistos TEXT,
  quiz_respondidos TEXT,
  pontuacao INTEGER DEFAULT 0,
  acertos INTEGER DEFAULT 0,
  total_questoes INTEGER DEFAULT 0,
  ultimo_estudo DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Dados iniciais para categorias
INSERT INTO categorias (nome, descricao) VALUES 
  ('respiratorio', 'Problemas respiratórios como gripe, resfriado, tosse e congestão nasal'),
  ('dermatologico', 'Problemas de pele como alergias, micoses, frieiras e queimaduras'),
  ('dores', 'Diferentes tipos de dores como cefaleia, dores musculares e articulares'),
  ('digestivo', 'Problemas digestivos como azia, diarreia, constipação e náuseas'),
  ('oftalmico', 'Problemas oculares como irritação, conjuntivite e olho seco'),
  ('bucal', 'Problemas bucais como aftas, gengivite e herpes labial'),
  ('musculoesqueletico', 'Problemas musculoesqueléticos como torções, contusões e câimbras');

-- Dados iniciais para públicos
INSERT INTO publicos (nome, descricao) VALUES 
  ('adultos', 'Pessoas adultas em geral'),
  ('criancas', 'Crianças até 12 anos'),
  ('idosos', 'Pessoas com mais de 65 anos'),
  ('diabeticos', 'Pessoas com diabetes');

-- Farmácia de demonstração
INSERT INTO farmacias (nome, cnpj, endereco, telefone, email, plano, status) VALUES
  ('Farmácia Demonstração', '12.345.678/0001-90', 'Av. Exemplo, 123', '(11) 1234-5678', 'demo@farmatreinamento.com.br', 'premium', 'ativo');

-- Usuário administrador para demonstração
INSERT INTO users (farmacia_id, nome, email, senha, cargo, role, status) VALUES
  (1, 'Administrador', 'admin@farmatreinamento.com.br', '$2a$10$xVtjyQR8eNl.Xt5JZGX8a.TQS.U1XMPPEFPbFCiLAL1XQgpQSJKuO', 'Administrador', 'admin', 'ativo'),
  (1, 'Gerente Demo', 'gerente@farmatreinamento.com.br', '$2a$10$xVtjyQR8eNl.Xt5JZGX8a.TQS.U1XMPPEFPbFCiLAL1XQgpQSJKuO', 'Gerente', 'gerente', 'ativo'),
  (1, 'Balconista Demo', 'balconista@farmatreinamento.com.br', '$2a$10$xVtjyQR8eNl.Xt5JZGX8a.TQS.U1XMPPEFPbFCiLAL1XQgpQSJKuO', 'Balconista', 'balconista', 'ativo');

-- Assinatura de demonstração
INSERT INTO assinaturas (farmacia_id, plano, data_inicio, data_fim, valor, status, max_usuarios) VALUES
  (1, 'premium', '2025-04-18', '2026-04-18', 199.90, 'ativa', 10);

-- Criar índices para melhorar a performance
CREATE INDEX idx_flashcards_categoria ON flashcards(categoria_id);
CREATE INDEX idx_flashcards_publico ON flashcards(publico_id);
CREATE INDEX idx_flashcards_tags ON flashcards(tags);
CREATE INDEX idx_quiz_categoria ON quiz_questions(categoria_id);
CREATE INDEX idx_quiz_nivel ON quiz_questions(nivel);
CREATE INDEX idx_medicamentos_nome ON medicamentos(nome);
CREATE INDEX idx_medicamentos_principio_ativo ON medicamentos(principio_ativo);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_users_farmacia_id ON users(farmacia_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_farmacias_email ON farmacias(email);
CREATE INDEX idx_assinaturas_farmacia_id ON assinaturas(farmacia_id);
