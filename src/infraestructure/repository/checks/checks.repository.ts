import type { IChecks, Checks, ChecksDTO, CheckFilter } from "../../../domain";
import type { Prisma } from "@prisma/client";
import { ChecksQuery } from "../extendDB/checks.query";
export class ChecksRepository implements IChecks {
    constructor(private readonly _prisma: Prisma.TransactionClient) {}

    withTransaction(prisma: Prisma.TransactionClient): IChecks {
        return new ChecksRepository(prisma);
    }

    getAll(q?: CheckFilter): Promise<ChecksDTO[]> {
        return this._prisma.$queryRaw(ChecksQuery.getAll(q));
    }

    async add(data: Checks): Promise<number> {
        const response = await this._prisma.marcas.create({
            data: {
                user_id: data.userId,
                tiempo: data.checkTime,
                id_horario: data.idSchedule                
            }
        })
        return response.id_marca ?? 0;
    }

}
