# Use uma imagem Node.js Alpine como base
FROM node

# Configure o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale apenas as dependências de produção
RUN npm install --production

# Copie o código-fonte para o contêiner
COPY . .

# Exponha a porta 3000 (ou a porta que você configurou no seu aplicativo Nest.js)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
