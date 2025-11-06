# Agregador de Links Full-Stack (Clone do Linktree)

Este é um projeto de portfólio de um agregador de links (similar ao Linktree) construído do zero. A aplicação permite que usuários se registrem, façam login, gerenciem seus próprios links (criar/listar) em um dashboard privado, e tenham uma página de perfil pública (`/:username`) para compartilhar com o mundo.

---

## 🚀 Tecnologias Utilizadas (Stack)

* **Front-end:**
    * React (com Vite)
    * TypeScript
    * React Router DOM (para navegação)
    * Axios (para chamadas de API)
    * Pico.css (para estilização rápida)

* **Back-end:**
    * Node.js
    * Express (para o servidor e rotas)
    * TypeScript (com `ts-node`)
    * Prisma (como ORM para o banco de dados)
    * MySQL (Banco de Dados Relacional)
    * Bcrypt (para hash de senhas)
    * CORS (para segurança da API)

---

## 🛠️ Como Executar este Projeto Localmente

Para rodar este projeto, você precisará ter o [Node.js](https://nodejs.org/) e um servidor [MySQL](https://dev.mysql.com/downloads/installer/) (recomendo o XAMPP) instalados.

### 1. Preparando o Back-end (API)

O "cérebro" da aplicação.

```bash

cd api

npm install

npx prisma migrate dev


npx ts-node src/index.ts