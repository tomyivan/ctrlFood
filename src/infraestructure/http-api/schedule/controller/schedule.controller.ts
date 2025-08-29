import type { ScheduleApplication } from "../../../../app";
import { Response, Request, NextFunction } from "express";
import { ResponseApi } from "../../../../util";
export class ScheduleController {
    constructor (
        private readonly _scheduleApp: ScheduleApplication
    ) {}    

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {schedule} = req.body;
            const result = await this._scheduleApp.update(schedule);
            result ? ResponseApi.successResponse(res, "Horario actualizado", { result }) : ResponseApi.notFoundResponse(res, "No se pudo actualizar el horario", {});
        } catch (error) {
            next(error);
        }
    }

    async getAllFood(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this._scheduleApp.getAllFood();
            result.length ? ResponseApi.successResponse(res, "Lista de horarios",  result) : ResponseApi.notFoundResponse(res, "No se encontraron horarios", []);
        } catch (error) {
            next(error);
        }
    }

    async addSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const { schedules } = req.body;
            const result = await this._scheduleApp.addSchedule(schedules);
            result ? ResponseApi.successResponse(res, "Horarios agregados", { result }) : ResponseApi.notFoundResponse(res, "No se pudieron agregar los horarios", {});
        } catch (error) {
            next(error);
        }  
    }

    async getAllSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const q = req.query;
            const result = await this._scheduleApp.getAllSchedule(q);
            result.length ? ResponseApi.successResponse(res, "Lista de horarios", result) : ResponseApi.notFoundResponse(res, "No se encontraron horarios", []);
        } catch (error) {
            next(error);
        }
    }
}