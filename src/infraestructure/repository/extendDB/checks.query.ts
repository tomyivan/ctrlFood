import { Prisma } from "@prisma/client";
import { CheckFilter } from "../../../domain";
export class ChecksQuery {
    static getAll(q?: CheckFilter): Prisma.Sql {
        let baseQuery =  Prisma.sql`SELECT mr.id_marca idCheck, mr.user_id userId, CAST(mr.tiempo AS TIME) checkTime, CAST(mr.tiempo AS DATE) checkDate, 
		hr.descripcion description, us.nombre employee, em.area FROM marcas mr
        INNER JOIN horarios hr ON hr.id_horario = mr.id_horario
		INNER JOIN usuarios us ON us.user_id = mr.user_id
		LEFT JOIN rrhhDB.dbo.empleados_view as em on em.dni = us.dni`;
        const query: Prisma.Sql[] = []
        if (q?.userId) {
            query.push(Prisma.sql`mr.user_id = ${q.userId}`);
        }
        if (q?.date) {
            query.push(Prisma.sql`CAST(mr.tiempo AS DATE) = ${q.date}`);
        }
        if (q?.idSchedule) {
            query.push(Prisma.sql`mr.id_horario = ${q.idSchedule}`);
        }
        if (q?.startDate && q?.endDate) {
            query.push(Prisma.sql`CAST(mr.tiempo AS DATE) BETWEEN ${q.startDate} AND ${q.endDate}`);
        }
        return Prisma.sql`${baseQuery} ${query.length > 0 ? Prisma.sql`WHERE ${Prisma.join(query, " AND ")}` : Prisma.sql``} ORDER BY mr.id_marca DESC`;
    }

    static countCheck(date: string): Prisma.Sql {
        return Prisma.sql`SELECT 
  COALESCE(SUM(CASE WHEN id_horario = 1 THEN 1 ELSE 0 END), 0) AS breakfast,
  COALESCE(SUM(CASE WHEN id_horario = 2 THEN 1 ELSE 0 END), 0) AS lunch,
  COALESCE(SUM(CASE WHEN id_horario = 3 THEN 1 ELSE 0 END), 0) AS tea,
  COALESCE(SUM(CASE WHEN id_horario = 4 THEN 1 ELSE 0 END), 0) AS dinner
FROM marcas WHERE CAST(tiempo as DATE) = ${date}`
    }
}