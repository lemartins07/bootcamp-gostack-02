import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

// objeto de configuração
export default {
  // configura como o multer vai armazenar os arquivos
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // gera um nome unico para o arquivo
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
