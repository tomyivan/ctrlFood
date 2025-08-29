import { Checks, IChecks } from "../../domain";
import { DateUtil } from "../../util";
export class ChecksService {
    constructor(private readonly _checksRepository: IChecks) {}
    
    async addCheck(data: Checks ): Promise<number> {
        const check = await this._checksRepository.getAll({ userId: data.userId, date: DateUtil.convertDate(data.checkTime),
            idSchedule: data.idSchedule
         });
        if( check.length > 0 ) {
            return 9999999;
        }
        return this._checksRepository.add(data);
    }

    
}
