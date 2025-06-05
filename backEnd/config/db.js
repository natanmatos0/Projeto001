// config/db.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'estacionei',
  password: process.env.DB_PASSWORD || '', // String vazia se não houver senha
  port: process.env.DB_PORT || 5432,
});

// Teste de conexão
pool.on('connect', () => {
  console.log('🟢 Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('🔴 Erro no PostgreSQL:', err);
});

// Exportação explícita
export { pool };  // Esta linha é crucial