import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
  }

 function generateToken(data: any){
    return jwt.sign(data, SECRET_KEY as jwt.Secret,{ expiresIn: '3000s'});
  }
  
  
 const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, SECRET_KEY as jwt.Secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            (req as any).user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  };

export { generateToken, authenticateJWT};