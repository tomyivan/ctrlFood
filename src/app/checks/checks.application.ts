import { CheckFilter, ChecksDTO, IChecks } from "../../domain";
export class ChecksApplication {
    constructor(private readonly _checksRepository: IChecks) {}

    getAll(q? : CheckFilter): Promise<ChecksDTO[]> {
        return this._checksRepository.getAll(q);
    }

}