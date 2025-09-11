import { ISchedule, Schedule, ScheduleDTO, ScheduleFilter, ScheduleFood, ScheduleFoodDTO } from "../../../domain";
import type { Prisma, PrismaClient } from "@prisma/client";
import { ScheduleQuery } from "../extendDB/schedule.query";
export class ScheduleRepository implements ISchedule {
    constructor( private readonly _prisma: Prisma.TransactionClient ) {}

    withTransaction(prisma: PrismaClient): ISchedule {
        return new ScheduleRepository(prisma);
    }

    async update(data: ScheduleFood): Promise<number> {
        const response = await this._prisma.horarios.update({
            where: { id_horario: data.idSchedule },
            data: {
                tiempo_inicio: data.startTime,
                tiempo_fin: data.endTime,
                descripcion: data.description
            }
        });
        return response.id_horario;
    }

    async getAllFood(): Promise<ScheduleFoodDTO[]> {
        return this._prisma.$queryRaw<ScheduleFoodDTO[]>(ScheduleQuery.getAllFood());
    }

    async addSchedule( data: Schedule[] ): Promise<number> {
        const response = await this._prisma.usuario_horario.createMany({
            data: data.map(item => ({
                user_id: item.userId,
                id_horario: item.idSchedule,
                fecha: new Date(String(item.date)),
            }))
        });
        return response.count;
    }

    async deleteSchedule(data: Schedule[], rangeDate?: {start: string , end : string}): Promise<number> {
        let response = { count: 0 };
        if (rangeDate?.start && rangeDate?.end) {
            response = await this._prisma.usuario_horario.deleteMany({
                where: {
                    fecha: {
                        gte: new Date(rangeDate.start),
                        lte: new Date(rangeDate.end)
                    },
                    user_id: { in: data.map(item => item.userId) }
                }
            });
        }else{
            response = await this._prisma.usuario_horario.deleteMany({
                where: { 
                    fecha: { in: data.map(item => new Date(String(item.date))) },
                    user_id: { in: data.map(item => item.userId) } }
            });
        }
    return response.count;
    }

    

    getAllSchedule( q?: ScheduleFilter ): Promise<ScheduleDTO[]> {
        return this._prisma.$queryRaw<ScheduleDTO[]>(ScheduleQuery.getAllSchedules(q));
    }

    async getEmployee(userId: number): Promise<string> {
        const result = await this._prisma.$queryRaw<any[]>(ScheduleQuery.getEmployee(userId));
        return result[0]?.employee || '';
    }

}