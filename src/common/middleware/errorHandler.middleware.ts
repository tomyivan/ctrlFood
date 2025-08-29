import { ResponseApi } from "../../util";
import { Request, Response, NextFunction } from "express";
import { ErrorCustom } from "../error/error.custom";
export class ErrorHandlerMiddleware {
    static handleError(err: Error | ErrorCustom, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        const status = err instanceof ErrorCustom ? err.statusCode : 500;
        status  >= 400 && status < 500 ?  
            ResponseApi.notFoundResponse(res, err.message, (err as ErrorCustom)?.details, status): 
        ResponseApi.errorResponse(res, 'Ocurrió un error en el servidor', {});
    }
}