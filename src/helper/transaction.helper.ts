// transaction.helper.ts
import type { Prisma, PrismaClient } from "@prisma/client";
import type { ITransaction } from "../domain";

export class TransactionHelper implements ITransaction {
    constructor(private readonly _prisma: PrismaClient) {}

    async execute<T>(work: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return await this._prisma.$transaction(work);
    }
}