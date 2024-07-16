import express, {Express} from "express";
import { Server } from "http";
import {LoggerService} from "./logger/logger.service";
import {ControllerUsers} from "./users/controller.users";
import {ExceptionFilter} from "./errors/exception.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    port: number;
    server: Server;
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.ControllerUsers) private userController: ControllerUsers,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
                ) {
        this.app = express();
        this.port = 8000;

    }

    useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExceptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log(`Server started ${this.port}`)
    }
}