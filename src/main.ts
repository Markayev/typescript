import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {ControllerUsers} from "./users/controller.users";
import {ExceptionFilter} from "./errors/exception.filter";
import {Container, ContainerModule, interfaces} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {TYPES} from "./types";
import {IExceptionFilter} from "./errors/exception.filter.inface";

export const appBindings = new ContainerModule(((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService)
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
    bind<ControllerUsers>(TYPES.ControllerUsers).to(ControllerUsers)
    bind<App>(TYPES.Application).to(App)
} ))

function bootstrap() {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    app.init()
    return { appContainer, app}

}


    export const {appContainer, app } = bootstrap()

