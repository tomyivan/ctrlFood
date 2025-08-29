import { Prisma } from "@prisma/client";
import { ScheduleFilter } from "../../../domain";
export class ScheduleQuery {
    static getAllFood(): Prisma.Sql {
        return Prisma.sql`SELECT id_horario idSchedule, tiempo_inicio startTime, tiempo_fin endTime, descripcion description FROM horarios`;
    }

    static getAllSchedules( q?: ScheduleFilter ): Prisma.Sql {
        const baseQuery = Prisma.sql`SELECT us.nombre employee, us.user_id userId, fecha date, us.dni, hr.descripcion description FROM usuario_horario uh
INNER JOIN usuarios us ON uh.user_id = us.user_id
INNER JOIN horarios hr ON uh.id_horario = hr.id_horario`;
        const filters: Prisma.Sql[] = [];
        if (q?.userId) {
            filters.push(Prisma.sql`us.user_id = ${q.userId}`);
        }
        if (q?.idSchedule) {
            filters.push(Prisma.sql`uh.id_horario = ${q.idSchedule}`);
        }
        if (q?.date) {
            filters.push(Prisma.sql`CAST(uh.fecha AS DATE) = ${q.date}`);
        }
        if (q?.dni) {
            filters.push(Prisma.sql`us.dni = ${q.dni}`);
        }
        return Prisma.sql`${baseQuery} ${filters.length ? Prisma.sql`WHERE ${Prisma.join(filters, " AND ")}` : Prisma.sql``}`;
    }
}