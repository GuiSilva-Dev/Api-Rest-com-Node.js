// --- server.js ---
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors'; // Importa o CORS

const app = express();
const port = 3000; // Porta que o servidor vai "ouvir"

// --- Configuração do Banco (como antes) ---
async function openDb() {
  return open({
    filename: './banco.db',
    driver: sqlite3.Database,
  });
}

// --- Middlewares (Funções "ponte") ---
app.use(cors()); // Permite que o front-end acesse este servidor
app.use(express.json()); // ESSENCIAL: Faz o Express entender JSON

/**
 * ROTA PRINCIPAL DA API
 * Esta é a "ponte" que o front-end vai chamar.
 *  app.post() pois o front-end vai ENVIAR (POSTAR) dados.
 */
app.post('/criar-usuario', async (req, res) => {
  // 1. Pega os dados que o front-end enviou no "corpo" (body) da requisição
  const { nome, sobrenome, idade, peso } = req.body;

  if (!nome || !sobrenome) {
    return res.status(400).send('Nome e sobrenome são obrigatórios.');
  }

  let db;
  try {
    db = await openDb();

    // 2. Cria a tabela (se não existir)
    // (Em um app real, isso rodaria só uma vez, mas aqui funciona)
    
    await db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, idade INTEGER, peso REAL)');
    //*db.run('DROP TABLE IF EXISTS usuarios')

    // 3. Insere os dados RECEBIDOS do front-end
    const result = await db.run(
      'INSERT INTO usuarios (nome, sobrenome, idade, peso) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, idade, peso]
    );

    console.log(`Usuário ${nome} salvo com ID: ${result.lastID}`);

    // 4. Envia uma resposta de sucesso de volta para o front-end
    res.status(201).send({ message: 'Usuário criado com sucesso!', id: result.lastID });

  } catch (err) {
    console.error('Erro no servidor:', err.message);
    res.status(500).send('Erro ao salvar no banco de dados.');
  } finally {
    if (db) await db.close();
  }
});

/**
 * ROTA PARA APAGAR A TABELA DE USUÁRIOS
 * app.delete() pois é uma operação de exclusão.
 */
app.delete('/apagar-tabela-usuarios', async (req, res) => {
  let db;
  try {
    db = await openDb();
    await db.run('DROP TABLE IF EXISTS usuarios');
    console.log('Tabela "usuarios" apagada com sucesso.');
    res.status(200).send({ message: 'Tabela de usuários apagada com sucesso!' });
  } catch (err) {
    console.error('Erro ao apagar a tabela:', err.message);
    res.status(500).send('Erro ao processar sua requisição.');
  } finally {
    if (db) await db.close();
  }
});

// --- Inicia o Servidor ---
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Aguardando requisições do front-end...');
});
