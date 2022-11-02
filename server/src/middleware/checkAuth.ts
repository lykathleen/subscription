import { Request, Response, NextFunction } from 'express'

export const checkAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.header("authorization");
  console.log(token);
  res.send(token);
}