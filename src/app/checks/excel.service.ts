import ExcelJS from 'exceljs'
import { ChecksDTO } from '../../domain';

export class FormatExcel {
    private _workbook: ExcelJS.Workbook | undefined;
    private _worksheet: ExcelJS.Worksheet | undefined;
    private _data: ChecksDTO[];
    private _title: string;
    private _isSeparate: boolean;

    constructor() {
        this._data = [];
        this._title = '';
        this._isSeparate = false;

        // No inicializamos _workbook ni _worksheet aquí
    }

    set isSeparate(sw: boolean) {
        this._isSeparate = sw;
    }

    set data(data: ChecksDTO[]) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set addSheet(title: string) {
        // Cada vez que se agrega una hoja, creamos un workbook nuevo
        this._workbook = new ExcelJS.Workbook();
        this._worksheet = this._workbook.addWorksheet(title);
        this._worksheet.properties.defaultColWidth = 15;
        this._title = title;
    }

    public addWorksheet(title: string) {
        // Crear workbook si no existe
        if (!this._workbook) this._workbook = new ExcelJS.Workbook();

        // Obtener o crear la hoja
        this._worksheet = this._workbook.getWorksheet(title) ?? this._workbook.addWorksheet(title);
        this._worksheet.properties.defaultColWidth = 15;
    }

    generateExcel() {
        if (!this._workbook) throw new Error("Workbook not initialized");
        if (!this._worksheet) throw new Error("Worksheet not initialized");
        // Resto del código tal cual
        this._worksheet.getColumn('A').width = 25;
        this._worksheet.getColumn('B').width = 10;
        this._worksheet.getColumn('C').width = 8;
        this._worksheet.getColumn('D').width = 10;
        this._worksheet.getColumn('E').width = 10;

        this.setTitle(this._title);
        this.setHeader();

        let numRow = this._worksheet.rowCount;
        this.data.forEach((item, index) => {
            const row = this._worksheet!.getRow(numRow + index + 1);
            row.getCell('A').value = item.employee;
            row.getCell('B').value = item.area ?? 'S/A';
            row.getCell('C').value = item.checkDate.toISOString().split('T')[0];
            row.getCell('D').value = item.checkTime.toISOString().split('T')[1].split('.')[0];
            row.getCell('E').value = item.description;
        });

        this._worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        return this._workbook;
    }

    private setTitle(titleValue: string) {
        this._worksheet!.mergeCells('A1:E1');
        const titleCell = this._worksheet!.getCell('A1');
        titleCell.value = titleValue;
        titleCell.font = { bold: true, size: 14 };
        titleCell.alignment = { horizontal: 'center' };
    }

    private setHeader() {
        const headers = ['EMPLEADO', 'AREA', 'FECHA', 'HORA', 'DETALLE'];
        headers.forEach((h, i) => {
            const cell = this._worksheet!.getCell(2, i + 1);
            cell.value = h;
            cell.font = { bold: true, size: 8 };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
    }
}
