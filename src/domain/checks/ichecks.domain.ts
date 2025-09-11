import type { Prisma } from "@prisma/client";
import type { ChecksDTO, Checks, CheckFilter, CheckCount } from "./check";

export interface IChecks {
    withTransaction(prisma: Prisma.TransactionClient): IChecks;
    getAll( q? : CheckFilter ): Promise<ChecksDTO[]>;
    add(data: Checks): Promise<number>;
    countCheck(date: string): Promise< CheckCount >;
}