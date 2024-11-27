import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


 function generateToken(data: any){
    return jwt.sign(data, SECRET_KEY as jwt.Secret,{ expiresIn: '3000s'});
  }

const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
  
  
 const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, SECRET_KEY as  string, (err, user) => {
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

export { generateToken, authenticateJWT, encryptPassword };