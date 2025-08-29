import { IUser, User, UserDTO } from "../../../domain";
import { Prisma } from "@prisma/client";
import { UserQuery } from "../extendDB/user.query";
export class UsersRepository implements IUser {
    constructor( private readonly _prisma: Prisma.TransactionClient ) {}

    withTransaction(prisma: Prisma.TransactionClient): IUser {
        return new UsersRepository(prisma);
    }

    getAll(): Promise<UserDTO[]> {
        return this._prisma.$queryRaw<UserDTO[]>(UserQuery.getAll());
    }

    getById(userId: number): Promise<UserDTO | null> {
        return this._prisma.$queryRaw<UserDTO | null>(UserQuery.getById(userId));
    }

    async add(data: User): Promise<number> {
        const response = await this._prisma.usuarios.create({
            data: {
                dni: data.dni,
                nombre: data.name,
                user_id: data.userId,
                rol: 0,
                activo: 1
            }
        });
        return response.user_id;
    }



}
