import { User, UserDTO } from "./user";
import type { Prisma } from "@prisma/client";
export interface IUser {
    withTransaction(prisma: Prisma.TransactionClient): IUser;
    getAll(): Promise<UserDTO[]>;
    add(user: User): Promise<number>;
    getById(userId: number): Promise<UserDTO | null>;
}