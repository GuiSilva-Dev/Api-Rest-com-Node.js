# API REST com Node.js e SQLite

Este é um projeto simples de backend desenvolvido com **Node.js** e **Express**, utilizando um banco de dados **SQLite** para persistência de dados. A API permite criar usuários e gerenciar a tabela do banco de dados.

## 🚀 Tecnologias Utilizadas

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/) - Framework web.
*   [SQLite3](https://www.npmjs.com/package/sqlite3) & [SQLite](https://www.npmjs.com/package/sqlite) - Banco de dados e driver.
*   [CORS](https://www.npmjs.com/package/cors) - Middleware para permitir requisições de diferentes origens.

## 📦 Pré-requisitos

Antes de começar, você precisa ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

## 🔧 Instalação e Execução

1.  Clone este repositório ou baixe os arquivos.
2.  Abra o terminal na pasta do projeto.
3.  Instale as dependências necessárias executando:

```bash
npm install express sqlite3 sqlite cors
```

4.  Inicie o servidor:

```bash
node Server.js
```

O servidor iniciará na porta **3000**.
Acesse: `http://localhost:3000`

---

## 📖 Documentação da API

### 1. Criar Usuário

Cria a tabela de usuários (se não existir) e insere um novo registro.

*   **URL:** `/criar-usuario`
*   **Método:** `POST`
*   **Corpo da Requisição (JSON):**

```json
{
  "nome": "João",
  "sobrenome": "Silva",
  "idade": 30,
  "peso": 75.5
}
```

*   **Campos:**
    *   `nome` (Obrigatório): String
    *   `sobrenome` (Obrigatório): String
    *   `idade`: Inteiro
    *   `peso`: Decimal (Real)

*   **Resposta de Sucesso (201 Created):**

```json
{
  "message": "Usuário criado com sucesso!",
  "id": 1
}
```

### 2. Apagar Tabela de Usuários

Remove completamente a tabela de usuários do banco de dados. Útil para resetar o ambiente.

*   **URL:** `/apagar-tabela-usuarios`
*   **Método:** `DELETE`

*   **Resposta de Sucesso (200 OK):**

```json
{
  "message": "Tabela de usuários apagada com sucesso!"
}
```

## 📝 Licença

Este projeto é de livre uso para fins de estudo.
