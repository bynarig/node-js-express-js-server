import {App} from "./app.js";
import { LoggerService } from './logger/logger.service.js';
import {UserController} from "./users/users.controller.js";
import {ExeptionFilter} from "./errors/exeption.filter.js";
import {Container} from "inversify";
import {ILogger} from "./logger/logger.interface.js";
import {TYPES} from "./types.js";
import {IExeptionFilter} from "./errors/exeption.filter.interfase.js";
import "reflect-metadata";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)
const app = appContainer.get<App>(TYPES.Application)
app.init();

export {app, appContainer}