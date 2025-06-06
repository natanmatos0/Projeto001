import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
  authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (!/^Bearer$/i.test(scheme) || !token) {
      return res.status(401).json({ error: 'Token malformado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      req.userId = decoded.id;
      return next();
    });
  },

  adminOnly(req, res, next) {
    // Exemplo de middleware para rotas administrativas
    // Implemente de acordo com sua lógica de permissões
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  }
}