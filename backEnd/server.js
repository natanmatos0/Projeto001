import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './config/db.js';
import { register, login } from './controllers/userController.js';

// Configura caminhos absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.post('/api/register', register);
app.post('/api/login', login);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: pool ? 'connected' : 'disconnected'
  });
});

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontEnd')));

// Rota para o frontend (corrigida)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontEnd/index.html'));
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});