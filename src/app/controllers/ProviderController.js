import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      // seleciona os campos para mostrar no retorno
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // inclui os relacionamentos do model
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
