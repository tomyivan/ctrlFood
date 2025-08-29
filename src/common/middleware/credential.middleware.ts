import { Request, Response, NextFunction } from "express";
// import { ResponseApi } from "../../../../util";
import { ResponseApi } from "../../util";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
export class CredentialMiddleware {
    static validationJWT(req: Request, res: Response, next: NextFunction) {
        const token: string = req.header('x-token') || '';
        if (!token){
             ResponseApi.notFoundResponse(res, 'Ingrese sus credenciales', null, 401);
                return;
            }
        try {
            const { dni, nickname, city, rol, area, sys, userName, permition1, permition2, permition3 } = jwt.verify(token, process.env.SECRET_JWT_SEED || '') as JwtPayload;
            // if ( process.env.NAME_APP_ABRV !== sys ) {
            //     const data:Auth = {
            //         dni,
            //         nickname,
            //         city,
            //         rol,
            //         area,
            //         sys : process.env.NAME_APP_ABRV || '',
            //         userName,
            //         permition1,
            //         permition2,
            //         permition3
            //     }    
            //     // const response = await UserUtil.changeToken(token,data);
            //     // if ( response ) {               
            //     //     req.headers['x-token'] = String(response);
            //     //     return await validationJWT(req,res,next);
            //     // }else{
            //     //     return ResponseApi.errorResponse(res, 'No tienes permisos para acceder a esta aplicación', null);
            //     // }
            // }
            req.dni = dni;
            req.nickname = nickname;
            req.rol = rol;
            req.area = area;
            req.city = city;
            req.sys = sys;
            req.permition1 = permition1;
            req.permition2 = permition2;
            req.permition3 = permition3;
            req.userName = userName;
            next();
        } catch (error) {
            console.log(error);
            ResponseApi.errorResponse(res, 'Error en el servidor', error);
        }
    }

    static checkRole(roles: number[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            roles.includes(req.rol as number) ? next() : ResponseApi.notFoundResponse(res, "No tiene los permisos suficientes", null, 403);
        }
    }

    static checkPermition(roles: number[], permitions: number[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(Number(req.rol))) return next();
            roles.includes(Number(req.rol)) && permitions.includes(Number(req.permition1)) ? next() : ResponseApi.notFoundResponse(res, "No tiene los permisos suficientes", null, 403);
        }
    }

    static checkPermition2(roles: number[], permitions: number[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(Number(req.rol))) return next();
             roles.includes(Number(req.rol)) && permitions.includes(Number(req.permition1)) ? next() : ResponseApi.notFoundResponse(res, "No tiene los permisos suficientes", null, 403);
        }
    }
}