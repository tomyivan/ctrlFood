import { ErrorCustom } from "../../common/error/error.custom";
import type { ScheduleFood, ScheduleFoodDTO, ISchedule, Schedule, ScheduleFilter, ScheduleDTO } from "../../domain"
import type { ScheduleService } from "./schedule.service";

export class ScheduleApplication {
    constructor(private readonly _scheduleRepo: ISchedule,
        private readonly _scheduleCached: ScheduleService
    ) {}

    update(data: ScheduleFood): Promise<number> {
        this._scheduleCached.clearCache();
        return this._scheduleRepo.update(data);
    }

    getAllFood(): Promise<ScheduleFoodDTO[]> {
        return this._scheduleCached.getAllFood();
    }

    async addSchedule(data: Schedule[]): Promise<number> {
        
        await this._scheduleRepo.deleteSchedule(String(data[0].date));
        return this._scheduleRepo.addSchedule(data);
    }

    getAllSchedule(q?: ScheduleFilter): Promise<ScheduleDTO[]> {
        return this._scheduleRepo.getAllSchedule(q);
    }

}