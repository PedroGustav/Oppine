import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import AppError from './errors/AppError';
import Routes from './routes/index';


const app = express();
app.use(express.json());
app.use(Routes);


app.use((err: Error | AppError, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'internal server error',
    })
})
app.listen(3333, () => {
    console.log('it`s amazing!');   
})