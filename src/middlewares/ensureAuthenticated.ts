import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // Verifica se o token é válido.
    const decoded = verify(token, authConfig.jwt.secret);

    // Forçando o tipo da variável 'decode'.
    const { sub } = decoded as TokenPayload;

    /**
     * Add o id do usuário na requisição para ser utilizado em qualquer rota que for chamada
     * depois deste middleware.
     */
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
