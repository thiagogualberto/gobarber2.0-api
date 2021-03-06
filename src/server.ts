import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());

// Rota para visualizar arquivos estáticos(Ex.: avatar)
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Middlewares específicos para tratativas de erros no express precisam ter 4 params.
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  /**
   * Verifica se o erro é uma instância da classe AppError, ou seja, erro gerado pela minha
   * aplicação.
   */
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Gerou um erro mais genérico
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333.');
});
