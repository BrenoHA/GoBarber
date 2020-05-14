import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  // Retorna um array com 2 palavrar (split) ['Bearer', 'dsijfoisdjfiojw8383...']
  // Utilizando uma desestruturação onde passo somente uma variável para receber o segundo valor

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
    // promisify(jwt.verify) returna uma f(token, .)
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
