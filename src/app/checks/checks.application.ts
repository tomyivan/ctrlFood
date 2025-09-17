import { CheckCount, CheckFilter, ChecksDTO, IChecks } from "../../domain";
import type { FormatExcel } from "./excel.service";
export class ChecksApplication {
    constructor(private readonly _checksRepository: IChecks,
        private readonly _excel: FormatExcel
    ) {}

    getAll(q? : CheckFilter): Promise<ChecksDTO[]> {
        return this._checksRepository.getAll(q);
    }

    countCheck(date: string): Promise< CheckCount > {
        return this._checksRepository.countCheck(date);
    } 

    async generateExcel( fileTitle: string, q? : CheckFilter): Promise<void> {
        const data = await this._checksRepository.getAll(q);
        this._excel.data = data;
        this._excel.addSheet = 'Marcas';
        const excel = await this._excel.generateExcel();
        await excel.xlsx.writeFile(`${fileTitle}`);
    }

}