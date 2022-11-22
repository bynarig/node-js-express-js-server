import { LoggerService } from "../logger/logger.service";

export abstract class BaseController{
	constructor(private logger: LoggerService){
		
	}
}