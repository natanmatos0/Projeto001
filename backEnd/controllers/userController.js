import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { nome, email, senha, celular } = req.body;

  try {
    // 1. Verificar se o usuário já existe
    const userExists = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1', 
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // 2. Criptografar a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 3. Inserir novo usuário
    const newUser = await pool.query(
      `INSERT INTO usuarios 
       (nome, email, senha_hash, celular) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nome, email, celular, data_cadastro`,
      [nome, email, senhaHash, celular]
    );

    // 4. Gerar token JWT
    const token = jwt.sign(
      { userId: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 5. Retornar resposta
    res.status(201).json({
      user: newUser.rows[0],
      token
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  // ... (seu código de login existente)
};

export { register, login };