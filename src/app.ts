import express, {Express} from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';
import {UserController} from "./users/users.controller.js";
import {ExeptionFilter} from "./errors/exeption.filter.js";
import {ILogger} from "./logger/logger.interface.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types.js";
import "reflect-metadata";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
	}

	useRoutes() {
		this.app.use('/users', this.userController.router);
	}

	useExseptiosFilters(){
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init() {
		this.useRoutes();
		this.useExseptiosFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`\n \n Сервер запущен на http://localhost:${this.port}`);
	}
}