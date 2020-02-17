import User from '../models/User';

class UserController {
  // cria um novo usuário
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.send(400).json({ error: 'User already exists' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // pega os dados do corpo da requisição
    const { email, oldPassword } = req.body;

    // busca os dados do usuário no BD
    const user = await User.findByPk(req.userId);

    // verifica se o email já existe no BD
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'user already exists.' });
      }
    }

    // verifica se o oldPassword foi preenchido com o '&&'
    // se foi preenc
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
