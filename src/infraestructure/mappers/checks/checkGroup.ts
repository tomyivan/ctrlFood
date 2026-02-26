import { CheckCountByUserDTO } from "../../../domain";
export class CheckGroupMapper {
    private data : CheckCountByUserDTO[] = [];
    private groupedData: Map<string, CheckCountByUserDTO[]>;
    constructor() {
        this.groupedData = new Map<string, CheckCountByUserDTO[]>();
    }


    setData(data: CheckCountByUserDTO[]): CheckGroupMapper {
        this.data = data;
        return this;
    }

    private hasDniInGroup(dni: string): boolean {
        return this.groupedData.has(dni);
    }

    private createNewGroup(dni: string, record: CheckCountByUserDTO) {
        this.groupedData.set(dni, []);
    }

    private addToGroup(dni: string, record: CheckCountByUserDTO) {
        this.groupedData.get(dni)?.push(record);
    }

    getGroup(): Record<string, CheckCountByUserDTO[]> {
        if (this.data.length === 0) {
            throw new Error("No se han establecido datos para agrupar");
        }
        for (const record of this.data) {
            const dni = record.dni;
            if (!this.hasDniInGroup(dni)) {
                this.createNewGroup(dni, record);
            }
            this.addToGroup(dni, record);
        }
        return Object.fromEntries(this.groupedData);
    }
}