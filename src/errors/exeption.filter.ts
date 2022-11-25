import {NextFunction, Response, Request} from "express";
import {LoggerService} from "../logger/logger.service";
import {IExeptionFilter} from "./exeption.filter.interfase.js";
import {HTTPError} from "./http-error.class.js";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface.js";
import {TYPES} from "../types.js";
import "reflect-metadata";

@injectable()
export class ExeptionFilter implements IExeptionFilter{
    constructor(@inject(TYPES.ILogger) private logger: ILogger) { }
    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction){
        if (err instanceof HTTPError){
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`)
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({err: err.message})
        }
    }
}