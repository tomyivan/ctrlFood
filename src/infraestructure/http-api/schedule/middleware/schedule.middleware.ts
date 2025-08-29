import { ScheduleApplication } from "../../../../app";
import { Response, Request, NextFunction } from "express";
// import { ResponseApi } from "../../../../util";
import { ErrorCustom } from "../../../../common/error/error.custom";
import { DateUtil } from "../../../../util";

export class ScheduleMiddleware {
    constructor(private readonly _scheduleApp: ScheduleApplication) {}

    async validateSchedule(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { schedules } = req.body;
        if (!schedules || !Array.isArray(schedules)) throw new ErrorCustom("Faltan datos", 400);
        const today = new Date();
        for (const schedule of schedules) {
            const [year, month, day] = schedule.date.split('-').map(Number);
            const scheduleDate = new Date(year, month - 1, day);
            if (
                scheduleDate.getFullYear() === today.getFullYear() &&
                scheduleDate.getMonth() === today.getMonth() &&
                scheduleDate.getDate() === today.getDate()
            ) {
                throw new ErrorCustom("No se puede crear un horario para hoy", 400);
            }
        }
        next();
    }

}