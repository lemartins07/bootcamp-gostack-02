import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  // cria um novo usuário
  async store(req, res) {
    // cria a validação dos dados de entrada do usuário
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // passa os dados do corpo da requisição para o schema definido validar
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
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
    // cria a validação dos dados de entrada do usuário
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string()
        .min(6)
        // valida somente se o oldPassword estiver preenchido
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // valida se o password e confirmPassord são iguais,
      // somente quando password estiver preenchido
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // passa os dados do corpo da requisição para o schema definido validar
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
