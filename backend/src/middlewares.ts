import type { NextFunction, Request, Response } from 'express';
import type { ErrorResponse } from './types';

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
