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

    async deleteSchedule(fecha: string): Promise<number> {
        const response = await this._prisma.usuario_horario.deleteMany({
            where: { fecha: new Date(fecha) }
        });
        return response.count;
    }

    getAllSchedule( q?: ScheduleFilter ): Promise<ScheduleDTO[]> {
        return this._prisma.$queryRaw<ScheduleDTO[]>(ScheduleQuery.getAllSchedules(q));
    }

}