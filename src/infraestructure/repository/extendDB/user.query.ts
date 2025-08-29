import { Prisma } from "@prisma/client";
export class UserQuery {
    static getAll(): Prisma.Sql {
        return Prisma.sql`select user_id userId, rol role, dni, password, nombre name  from usuarios where activo = 1`;
    }   

    static getById(userId: number): Prisma.Sql {
        return Prisma.sql`select user_id userId, rol role, dni, password, nombre name  from usuarios where activo = 1 and user_id = ${userId}`;
    }
}