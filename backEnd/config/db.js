import pg from 'pg';
const { Pool } = pg;

// Garante que a senha seja string
const dbPassword = String(process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: dbPassword,
  port: process.env.DB_PORT,
  ssl: false,
  connectionTimeoutMillis: 5000
});

// Teste de conexão explícito
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Conexão com PostgreSQL estabelecida com sucesso'))
  .catch(err => console.error('❌ Falha na conexão:', err));

export { pool };