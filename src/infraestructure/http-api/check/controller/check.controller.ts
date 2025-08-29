import type { ChecksApplication } from "../../../../app";
import { Response, Request, NextFunction } from "express";
import { ResponseApi } from "../../../../util";
export class ChecksController {
    constructor(private readonly _checksApp: ChecksApplication) {}
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const q = req.query;
            const response = await this._checksApp.getAll(q);
            response.length === 0 ? ResponseApi.notFoundResponse(res, "No se encontraron registros", []) : ResponseApi.successResponse(res, "Registros encontrados", response);

        } catch (error) {
            next(error);
        }
    }
}