import type { UserApplication } from "../../../../app";
import { ResponseApi } from "../../../../util";
import { Response, Request, NextFunction } from "express";
export class UsersController {
    constructor(private readonly _userApp: UserApplication) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._userApp.getAll();
            response.length > 0
                ? ResponseApi.successResponse(res, "Usuarios encontrados", response)
                : ResponseApi.notFoundResponse(res, "No se encontraron usuarios", []);
        } catch (error) {
            next(error);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req.body;
            const userId = await this._userApp.add(user);
            userId ? ResponseApi.successResponse(res, "Usuario creado", { id: userId }) : ResponseApi.notFoundResponse(res, "Error al crear usuario", {});
        } catch (error) {
            next(error);
        }
    }
}