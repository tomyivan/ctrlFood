import type { ChecksApplication } from "../../../../app";
import { Response, Request, NextFunction } from "express";
import { ResponseApi } from "../../../../util";
import path from "path";
import fs from "fs";
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

    async checkCount(req: Request, res: Response, next: NextFunction) {
        try {
            const {date} = req.query;
            const response = await this._checksApp.countCheck(date as string);
            ResponseApi.successResponse(res, "Conteo de marcas", response);
        }
        catch (error) {
            next(error);
        }
            
    }

    async generateExcel(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
            const title = `Marcas_${new Date().toISOString()}.xlsx`;
            const filePath = path.join(__dirname, '../../../../../public', 'excel', title.replace(/[\\/:*?[\]]/g, '') );
            await this._checksApp.generateExcel(filePath, query);
            res.download(filePath, title, (err) => {
                if (err) {
                    console.log("Error al descargar el archivo: ", err);
                    return ResponseApi.errorResponse(res, 'Error al descargar el archivo', err);
                }else{
                    console.log("Archivo descargado correctamente: ", filePath);
                    fs.unlinkSync(filePath); 
                }
            });
        } catch (error) {
            next(error);
        }
    }
}