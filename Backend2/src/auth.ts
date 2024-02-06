import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface ExtendedRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'helloall');
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
