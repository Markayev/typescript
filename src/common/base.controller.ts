import {LoggerService} from "../logger/logger.service";
import {Router, Request, Response} from "express";
import {IControllerRoute} from "./route.interface";
import {ILogger} from "../logger/logger.interface";
import {injectable} from "inversify";
export {Router} from "express"
import 'reflect-metadata';
@injectable()
export abstract class BaseController {
    private readonly _route: Router;
    constructor(private logger: ILogger) {
        this._route = Router()
    }
    get router() {
        return this._route
    }

    public send<T>( res: Response, code: number, message:T) {
        res.type('application/json')
        return res.status(code).json(message)
    }

    public ok<T> (res: Response, message: T) {
        return this.send<T>( res, 200, message)
    }

    public created( res: Response) {
        res.sendStatus(201)
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            // Ensure this.router is properly initialized before accessing route.method
            if (this.router[route.method]) {
                this.router[route.method](route.path);
            } else {
                // Handle the case where route.method is not defined on this.router
                this.logger.error(`Unsupported HTTP method ${route.method} for route ${route.path}`);
            }
        }
    }
}