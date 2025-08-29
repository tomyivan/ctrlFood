import { ResponseApi } from "../../../../util";
import { Response, Request, NextFunction } from "express";
import type { BiometricApplication } from "../../../../app";
export class BiometricController {
    constructor(private readonly _bioApp: BiometricApplication) {}
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this._bioApp.getUsers();
            response.length > 0 ? ResponseApi.successResponse(res, 'Usuarios obtenidos', response) :
            ResponseApi.notFoundResponse(res, 'No hay usuarios registrados', []);
        } catch (error) {
            next(error);
        }
    }

    async setUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {users} = req.body;
            const response = await this._bioApp.setUser(users);
            ResponseApi.successResponse(res, 'Usuario creado', response);
        } catch (error) {
            next(error);
        }
    }

}