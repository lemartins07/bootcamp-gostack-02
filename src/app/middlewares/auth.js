import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // desestruturação de array, passando uma ',' desconsidera a primeira posição
  // e pega somente a segunda
  const [, token] = authHeader.split(' ');

  try {
    // o promissify pega um callback e transforma em async await
    // ele retorna uma função, então o segundo parentes é a chamada desse retorno
    // da primeira função
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // insere o id do usuário na requisção, para não utilizar route paranms
    // na hora de editar o usuário
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
