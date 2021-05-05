import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../shared/security';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'token not provided' });
    }

    const [, token] = authHeader.split(' ');

    if (validateToken(token)) {
      return next();
    } else {
      return res.status(401).json({ error: 'token invalid' });
    }
  }
}
