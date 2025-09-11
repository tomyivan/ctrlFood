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

    async addSchedule(data: Schedule[], rangeDate?: {start: string , end : string}): Promise<number> {
        await this._scheduleRepo.deleteSchedule(data, rangeDate);
        const newData = data.filter(d => d.idSchedule !== 0);
        if (newData.length === 0) return 0;
        return this._scheduleRepo.addSchedule(newData);
    }

    getAllSchedule(q?: ScheduleFilter): Promise<ScheduleDTO[]> {
        return this._scheduleRepo.getAllSchedule(q);
    }

}