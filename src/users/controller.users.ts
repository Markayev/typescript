import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HttpErrorsClass} from "../errors/http-errors.class";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";
import 'reflect-metadata';
import {IUserController} from "./user.controller.interface";
@injectable()
export class ControllerUsers extends BaseController implements IUserController{
    constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
        super(loggerService)
        this.bindRoutes( [{path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login}
        ])
    }


    login(req: Request, res: Response, next: NextFunction) {
        this.ok( res, 'login')
    }
    register(req: Request, res: Response, next: NextFunction) {
        // this.ok( res, 'register')
        next(new HttpErrorsClass(401, 'Error registration'))
    }

}