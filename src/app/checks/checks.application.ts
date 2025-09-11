import { CheckCount, CheckFilter, ChecksDTO, IChecks } from "../../domain";
export class ChecksApplication {
    constructor(private readonly _checksRepository: IChecks) {}

    getAll(q? : CheckFilter): Promise<ChecksDTO[]> {
        return this._checksRepository.getAll(q);
    }

    countCheck(date: string): Promise< CheckCount > {
        return this._checksRepository.countCheck(date);
    } 

}