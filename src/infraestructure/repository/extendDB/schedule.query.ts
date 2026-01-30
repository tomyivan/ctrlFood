import { Prisma } from "@prisma/client";
import { ScheduleFilter, ScheduleCopy } from "../../../domain";
export class ScheduleQuery {
    static getAllFood(): Prisma.Sql {
        return Prisma.sql`SELECT id_horario idSchedule, tiempo_inicio startTime, tiempo_fin endTime, descripcion description FROM horarios`;
    }

    static getAllSchedules( q?: ScheduleFilter ): Prisma.Sql {
        const baseQuery = Prisma.sql`SELECT us.nombre employee, us.user_id userId, fecha date, us.dni, hr.descripcion description, hr.tiempo_inicio startTime, hr.tiempo_fin endTime, uh.id_horario idSchedule FROM usuario_horario uh
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
        if (q?.startDate && q?.endDate) {
            filters.push(Prisma.sql`CAST(uh.fecha AS DATE) BETWEEN ${q.startDate} AND ${q.endDate}`);
        }
        return Prisma.sql`${baseQuery} ${filters.length ? Prisma.sql`WHERE ${Prisma.join(filters, " AND ")}` : Prisma.sql``}`;
    }
    static getEmployee(userId: number): Prisma.Sql {
        return Prisma.sql`SELECT us.nombre employee FROM usuarios us WHERE us.user_id = ${userId}`;
    }

    static getCountSchedulesByDate(startDate: string, endDate: string): Prisma.Sql {
        return Prisma.sql`SELECT 
            COUNT(*) AS totalSchedules
            FROM usuario_horario
            WHERE CAST(fecha AS DATE) BETWEEN ${startDate} AND ${endDate}
            ORDER BY CAST(fecha AS DATE);`
    }

    static copySchedulesFromDate(copy: ScheduleCopy): Prisma.Sql {
        return Prisma.sql`SET DATEFIRST 1; -- lunes
DECLARE @anio_origen INT = ${copy.fromDate.year};
DECLARE @mes_origen INT = ${copy.fromDate.month};
DECLARE @anio_destino INT = ${copy.toDate.year};
DECLARE @mes_destino INT = ${copy.toDate.month};

WITH base AS (
    -- Tomamos solo combinaciones únicas por user_id + id_horario + día de la semana
    SELECT DISTINCT
        user_id,
        id_horario,
        DATEPART(WEEKDAY, fecha) AS dia_semana,
        activo
    FROM usuario_horario
    WHERE YEAR(fecha) = @anio_origen
      AND MONTH(fecha) = @mes_origen
),
dias_destino AS (
    -- Generar todos los días del mes destino
    SELECT DATEADD(DAY, n.number, DATEFROMPARTS(@anio_destino, @mes_destino, 1)) AS fecha
    FROM master..spt_values n
    WHERE n.type = 'P'
      AND n.number <= DAY(EOMONTH(DATEFROMPARTS(@anio_destino, @mes_destino, 1))) - 1
)
INSERT INTO usuario_horario (user_id, id_horario, fecha, activo, fecha_creacion)
SELECT 
    b.user_id,
    b.id_horario,
    dd.fecha AS fecha,
    b.activo,
    GETDATE()
FROM base b
CROSS JOIN dias_destino dd
WHERE DATEPART(WEEKDAY, dd.fecha) = b.dia_semana
  -- Evita duplicados: si ya existe este id_horario para ese usuario en esa fecha
  AND NOT EXISTS (
      SELECT 1
      FROM usuario_horario u
      WHERE u.user_id = b.user_id
        AND u.id_horario = b.id_horario
        AND u.fecha = dd.fecha
  )
ORDER BY dd.fecha, b.user_id;`
    }
}