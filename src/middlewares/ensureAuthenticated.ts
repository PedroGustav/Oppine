import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

declare global{

    namespace Express{

        export interface Request{

            user:{
                id: string;
            }
        }
    }
}

interface TokenPayLoad{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction){


    //Validação de token JWT

    const authHeader = request.headers.authorization;
    
    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split('');

    try{

        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        console.log(decoded);

        request.user = {id: sub};
        return next();
    }catch{
        throw new AppError('Invalid JWT token.',401);
    }

}