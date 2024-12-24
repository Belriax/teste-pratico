<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Financial Transactions API

Uma API desenvolvida em **Node.js** com **NestJS**, **TypeORM**, e **PostgreSQL** para gerenciar transações financeiras, incluindo depósitos, saques e transferências entre usuários.

---

## 📋 Funcionalidades

- Cadastro de usuários com **e-mail** e senhas criptografadas.
- Autenticação segura utilizando **JWT**.
- Operações de depósito e saque no saldo do usuário.
- Transferências entre usuários com validações de saldo.
- Consulta de transações associadas a cada usuário.
- Validações robustas para garantir a integridade dos dados.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução.
- **NestJS**: Framework para aplicações escaláveis.
- **TypeORM**: ORM para manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Redis**: Para gerenciamento de filas com **Bull**.
- **Docker**: Containerização para **Redis** e **PostgreSQL**.
- **Swagger**: Documentação automatizada da API.
- **Bcrypt**: Criptografia de senhas.
- **JWT**: Token seguro para autenticação.

---

## 📦 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

1. **Node.js** (v14 ou superior): [Baixar Node.js](https://nodejs.org)
2. **Docker e Docker Compose**: [Baixar Docker](https://www.docker.com)
3. **Git**: [Baixar Git](https://git-scm.com)

---

## 💻 Passo a Passo para Rodar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/Viana-AlvesTiago/transactions-system.git
cd transactions-system
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```plaintext
# Configurações do Banco de Dados
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=financial_system

# Configuração do JWT
JWT_SECRET=your_jwt_secret_key

# Configuração do Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Porta do servidor
PORT=3000
```

### 4. Suba os Containers do Docker

Certifique-se de que as portas **5432** (PostgreSQL) e **6379** (Redis) estejam disponíveis e execute:

```bash
docker-compose up -d
```

### 5. Execute as Migrations

Crie as tabelas necessárias no banco de dados:

```bash
npm run typeorm:migration:run
```

### 6. Inicie o Servidor

Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

### 7. Acesse a Documentação da API

Acesse a interface Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🧪 Testes

Para rodar os testes unitários, utilize:

```bash
npm run test
```

---

## 📂 Estrutura do Projeto

```plaintext
src/
│-- auth/  
│   │-- auth.controller.ts         # Controlador do módulo de autenticação  
│   │-- auth.dto.ts                # DTOs para autenticação  
│   │-- auth.module.ts             # Módulo de autenticação  
│   │-- auth.service.spec.ts       # Testes unitários para o serviço de autenticação  
│   │-- auth.service.ts            # Serviço de autenticação  
│   │-- jwt.strategy.ts            # Estratégia de autenticação JWT  
│
│-- queue/  
│   │-- daily-report.processor.ts  # Processador para relatórios diários  
│   │-- queue.module.ts            # Módulo de gerenciamento de filas  
│   │-- queue.service.spec.ts      # Testes unitários do serviço de filas  
│   │-- report.scheduler.ts        # Agendador para geração de relatórios  
│   │-- transaction.process.ts     # Processamento de transações em fila  
│
│-- transactions/  
│   │-- transaction.dto.ts         # DTOs para operações de transações  
│   │-- transaction.entity.ts      # Entidade de transação  
│   │-- transactions.controller.ts # Controlador do módulo de transações  
│   │-- transactions.module.ts     # Módulo de transações  
│   │-- transactions.service.spec.ts # Testes unitários para o serviço de transações  
│   │-- transactions.service.ts    # Serviço de transações  
│
│-- user/  
│   │-- user.controller.ts         # Controlador do módulo de usuários  
│   │-- user.dto.ts                # DTOs para operações de usuário  
│   │-- user.entity.ts             # Entidade de usuário  
│   │-- user.module.ts             # Módulo de usuários  
│   │-- user.service.spec.ts       # Testes unitários do serviço de usuários  
│   │-- user.service.ts            # Serviço de usuários  
│
│-- app.module.ts                  # Módulo principal da aplicação  
│-- main.ts                        # Arquivo principal de execução  
```

### Outros Arquivos

```plaintext
.env                              # Variáveis de ambiente  
.eslintrc.js                      # Configurações do ESLint  
.gitignore                        # Arquivos ignorados pelo Git  
.prettierrc                       # Configurações do Prettier  
docker-compose.override.yml       # Configuração extra do Docker Compose  
```

---

## 🔑 Endpoints Importantes

- **Cadastro de Usuários**:  
  `POST /users/signup`  
- **Login**:  
  `POST /auth/signin`  
- **Depósito e Saque**:  
  `POST /transactions`  
- **Transferência**:  
  `POST /transactions/transfer`  
- **Listar Transações**:  
  `GET /transactions/:userId`  

---

## 📞 Contato

- **Nome**: Gleicon Sousa dos Santos  
- **E-mail**: [gleiconsousa@gmail.com](mailto:gleiconsousa@gmail.com)  
- **GitHub**: [https://github.com/belriax](https://github.com/belriax)
