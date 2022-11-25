import {BaseController} from "../common/base.controller.js";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types.js";
import {ILogger} from "../logger/logger.interface.js";
import "reflect-metadata";


@injectable()
export class UserController extends BaseController{
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {path: "/register", method: "post", func: this.register},
            {path: "/login", method: "post", func: this.login}
        ])
    }
    login(req: Request, res: Response, next: NextFunction){
        next(new HTTPError(401, "authorization error", "login"))
    }
    register(req: Request, res: Response, next: NextFunction){
        this.ok(res, "register");
    }
}