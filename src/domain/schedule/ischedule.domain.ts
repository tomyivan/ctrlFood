import { ScheduleFoodDTO, ScheduleFood, Schedule, ScheduleFilter, ScheduleDTO } from "./schedule";
import type { PrismaClient } from "@prisma/client";
export interface ISchedule {
    withTransaction(prisma: PrismaClient): ISchedule;
    update( data: ScheduleFood ): Promise<number>,
    getAllFood(): Promise<ScheduleFoodDTO[]>,
    addSchedule(data: Schedule[]): Promise<number>,
    deleteSchedule(data:Schedule[], rangeDate?: {start: string , end : string}): Promise<number>,
    getAllSchedule( q?: ScheduleFilter ): Promise<ScheduleDTO[]>,
    getEmployee(userId: number): Promise<string>
}