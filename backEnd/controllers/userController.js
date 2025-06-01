import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
  const { nome, email, senha, celular } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  try {
    // Verifica se usuário já existe
    const userExists = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1', 
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Insere novo usuário
    const result = await pool.query(
      `INSERT INTO usuarios 
       (nome, email, senha_hash, celular) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, celular, data_cadastro`,
      [nome, email, senhaHash, celular]
    );

    // Gera token JWT
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      user: result.rows[0],
      token
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    // Busca usuário
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1', 
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Verifica senha
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        celular: user.celular
      },
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    next(error);
  }
};

export { register, login };