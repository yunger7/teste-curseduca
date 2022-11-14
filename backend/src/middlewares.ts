import jwt from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';
import type { ErrorResponse, AccessTokenPayload } from './types';

const JWT_ACCESS_SECRET = process.env['JWT_ACCESS_SECRET'];

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.match(/^bearer .*$/i)) {
    res.status(401);
    throw new Error('Missing or invalid Authorization header.');
  }

  if (!JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET env variable is not defined');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, JWT_ACCESS_SECRET) as AccessTokenPayload;
    req.payload = payload;
  } catch (error: any) {
    res.status(401);

    if (error.name === 'TokenExpiredError') {
      throw new Error(error.name);
    }

    throw new Error('Unauthorized');
  }

  return next();
};
