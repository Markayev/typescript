import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service";
import {IExceptionFilter} from "./exception.filter.inface";
import {HttpErrorsClass} from "./http-errors.class";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface";
import {TYPES} from "../types";
import 'reflect-metadata';
@injectable()
export class ExceptionFilter implements IExceptionFilter{
    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    }
    catch ( err: Error| HttpErrorsClass, req: Request, res: Response, next: NextFunction) {

        if (err instanceof HttpErrorsClass) {
            this.logger.error(`[${err.context}] ${err.statusCode}: ${err.message}`)
            res.status(err.statusCode).send({error: err.message})
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({error: err.message})
        }
    }
}
