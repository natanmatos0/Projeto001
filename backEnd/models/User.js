const pool = require('../config/db');

module.exports = {
  async create({ nome, email, celular, senha }) {
    const query = `
      INSERT INTO usuarios (nome, email, celular, senha_hash)
      VALUES ($1, $2, $3, crypt($4, gen_salt('bf')))
      RETURNING id, nome, email, celular
    `;
    const values = [nome, email, celular, senha];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findByEmail(email) {
    const query = `
      SELECT id, nome, email, celular, senha_hash
      FROM usuarios WHERE email = $1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
};