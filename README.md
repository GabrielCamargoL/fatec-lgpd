<h1 align="center"> Serviço Backend LGPD</h1>

### :hammer_and_wrench: Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas neste projeto: `Typescript, NestJS, PostgreSQL, Docker, Insomnia`

### :gear: Como utilizar

Para consumir esta API, é preciso seguir o passo a passo abaixo

- Tutorial para rodar o projeto

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/GabrielCamargoL/fatec-lgpd.git

# Acesse a pasta do projeto
$ cd fatec-lgpd

# criar um arquivo chamado ".env" e copiar a estrutura do arquivo ".env.example" e colocar seus respectivos dados

# instale as dependencias
$ yarn install

# Utilize o docker-compose para criar o banco de dados
$ docker-compose up -d

# Utilize o comando do Prisma para sincronizar a estrutura do banco de dados
$ npx prisma migrate deploy

# Inicie o Projeto
$ yarn start
```

O servidor inciará localmente na porta 3000. Use o Insomnia ou postman para simular requisições e respostas das rotas (pelo link [https://localhost:3000](https://localhost:3000))

Caso queira usar o Insomnia para testar as rotas, use o arquivo Insomnia_2023_mm_dd.json para importar as requisições.
