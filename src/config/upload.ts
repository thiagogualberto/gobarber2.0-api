import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  // Armazena o arquivo na própria estrutura da aplicação
  storage: multer.diskStorage({
    // Caminho onde será colocado a imagem
    destination: tmpFolder,
    // Nome que o arquivo irá receber
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
