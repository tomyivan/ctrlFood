import type { Prisma } from "@prisma/client";

export interface ITransaction {
    execute<T>(work: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T>;
}