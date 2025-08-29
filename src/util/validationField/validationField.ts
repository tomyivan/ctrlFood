import { Response } from "express";
import { validationResult } from "express-validator";
import { ResponseApi } from "../response/responseApi.util";
export const validationField = (req: any, res: Response, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ResponseApi.notFoundResponse(res, 'Error en los campos', errors.mapped());
        return;
    }
    next();
}