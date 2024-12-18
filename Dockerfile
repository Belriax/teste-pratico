# Etapa 1: Imagem base para Node.js
FROM node:16 AS builder

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json (ou yarn.lock) para instalar dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o código-fonte da aplicação para o contêiner
COPY . .

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Imagem base para execução
FROM node:16

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários da etapa anterior (compilação)
COPY --from=builder /usr/src/app /usr/src/app

# Expor a porta da aplicação
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]