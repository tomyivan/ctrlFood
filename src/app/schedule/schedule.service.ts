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


    async validationSchedule( q: ScheduleFilter, check: Date ): Promise<ScheduleDTO & {ok:boolean} | {
        ok: boolean;
        employee: string;
    } > {
        const [ schedules, employee ] = await Promise.all([
            this._schedule.getAllSchedule(q),
            this._schedule.getEmployee(Number(q.userId))
        ]);
        if( !schedules ) return { ok: false, employee: "Desconocido" };
        for (const item of schedules) {
            if(DateUtil.isInRangeHour( item.startTime, item.endTime, check)) return {...item, ok: true};
        }
        return { ok: false, employee: employee === '' || employee === undefined ? "Desconocido" : employee };
    }

    clearCache() {
        ScheduleCached.clearCache();
    }
}