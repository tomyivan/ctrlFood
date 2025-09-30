import type { IChecks, Checks, ChecksDTO, CheckFilter, CheckCount } from "../../../domain";
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

    async countCheck(date: string): Promise<CheckCount> {
        const response = await this._prisma.$queryRaw<CheckCount[]>(ChecksQuery.countCheck(date))
        return response[0] ?? { breakfast: 0, lunch: 0, tea: 0, dinner: 0 };
    }

    async add(data: Checks): Promise<number> {
        const response = await this._prisma.marcas.create({
            data: {
                user_id: data.userId,
                tiempo: data.checkTime,
                id_horario: data.idSchedule,
                fecha: data.checkTime,
                hora: data.checkTime
            }
        })
        return response.id_marca ?? 0;
    }

}
