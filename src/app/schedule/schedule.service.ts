import { ScheduleCached, DateUtil } from "../../util";
import { ISchedule, ScheduleDTO, ScheduleFilter, ScheduleFoodDTO } from "../../domain";

export class ScheduleService {
    constructor(private readonly _schedule: ISchedule) {}

    async getAllFood(): Promise<ScheduleFoodDTO[]> {
        const cached = ScheduleCached.getCache("all");
        if (cached) {
            return cached;
        }
        const data = await this._schedule.getAllFood();
        ScheduleCached.setCache("all", data);
        return data;
    }

    async existSchedule( q: ScheduleFilter ): Promise<ScheduleDTO> {
        const response = await this._schedule.getAllSchedule(q);
        return response[0];
    }

    async validationSchedule( q: ScheduleFilter, check: Date ): Promise<ScheduleFoodDTO & ScheduleDTO | false > {
        const [ schdlFood, existSchedule ] = await Promise.all([
            this.getAllFood(),
            this.existSchedule(q)
        ]);
        if( !existSchedule ) return false;
        for (const item of schdlFood) {
            if(DateUtil.isInRangeHour( item.startTime, item.endTime, check)) return {...existSchedule, ...item};
        }
        return false;
    }

    clearCache() {
        ScheduleCached.clearCache();
    }
}