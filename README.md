<p align="center">
  <a href="https://teste-curseduca.vercel.app/">
    <img src="./frontend/public/logo-full.svg" height="84" />
  </a>
  <p align="center">Minha resolução do teste (React/Node) da Curseduca</p>
  <p align="center">
    <a href="https://teste-curseduca.vercel.app/" target="_blank"><img src="https://img.shields.io/website?down_color=FA5252&down_message=Inativo&label=Website&style=flat-square&up_color=BE4BDB&up_message=Ativo&color=BE4BDB&url=https%3A%2F%2Fteste-curseduca.vercel.app" /></a>
    <img src="https://img.shields.io/github/last-commit/yunger7/teste-curseduca?color=BE4BDB&label=Ultimo%20commit&logo=github&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/languages/code-size/yunger7/teste-curseduca?color=BE4BDB&label=Tamanho&logo=github&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/languages/top/yunger7/teste-curseduca?color=BE4BDB&label=TypeScript&logo=typescript&logoColor=ffffff&style=flat-square" />
    <img src="https://img.shields.io/github/license/yunger7/teste-curseduca?&color=BE4BDB&label=Licen%C3%A7a&logo=github&logoColor=ffffff&style=flat-square" />
  </p>
</p>

## Sobre
Este repositório é a minha resolução do teste (React/Node) proposto pela Curseduca. Na aplicação, é possível realizar o cadastro e login de usuários, bem como operações CRUD com posts. O projeto está publicado e pode ser acessado a qualquer momento clicando [aqui](https://teste-curseduca.vercel.app/).

Com um pouco mais de tempo, seria possível implementar diversas features e melhorias, por exemplo: paginação, likes, comentários, tags, pesquisa, etc.

## Tecnologias
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Mantine](https://mantine.dev/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/) + [Planetscale](https://planetscale.com/) (Em produção)

## Instalação
Primeiro, clone o repositório na sua máquina e instale as dependências dos projetos `frontend` e `backend`, depois inicie o ambiente de desenvolvimento de ambos com `npm run dev`.
```
$ git clone https://github.com/yunger7/teste-curseduca.git
$ cd ./teste-curseduca

# backend
$ cd ./backend
$ npm install
$ npm run dev

# frontend
$ cd ./frontend
$ npm install
$ npm run dev
```
Abra http://localhost:5173 no seu navegador e voilà!

OBS: É necessário configurar as variáveis de ambiente do backend, veja `.env.example` para consultar o formato.

## Licença
Licenciado sob a Licença MIT. Consulte `LICENSE` para mais detalhes.

<hr /><br />

<p align="center">Feito com ☕ e TypeScript <br/> por <a href="https://luisgalete.com.br/">Luís Galete</a></p>
