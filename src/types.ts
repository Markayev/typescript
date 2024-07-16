import {ExceptionFilter} from "./errors/exception.filter";
import {ControllerUsers} from "./users/controller.users";

export const TYPES = {
    Application: Symbol.for('Application'),
    ILogger: Symbol.for('ILogger'),
    ControllerUsers: Symbol.for('ControllerUsers'),
    ExceptionFilter: Symbol.for('ExceptionFilter'),
}