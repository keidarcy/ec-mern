import { Request, Response, NextFunction } from 'express';
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`NOT FOUND - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (res.statusCode = 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    url: req.originalUrl,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
  next();
};
