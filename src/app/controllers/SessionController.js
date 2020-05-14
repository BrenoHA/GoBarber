import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    // Check se usuário exxiste
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    // Chech se senha bate
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    // Passou verificações
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Json Web Token
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      // payload informações adicionais dentro do JWT
    });
  }
}

export default new SessionController();
