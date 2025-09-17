import ExcelJS from 'exceljs'
import { ChecksDTO } from '../../domain';

export class FormatExcel {
    private _workbook: ExcelJS.Workbook;
    private _worksheet: ExcelJS.Worksheet;
    private _data: ChecksDTO[];
    private _title: string;
    private _isSeparate: boolean
    constructor() {
        this._title = '';
        this._workbook = new ExcelJS.Workbook();        
        this._worksheet = null as any;
        this._data = [];
        this._isSeparate = false;
    }
    set isSeparate (sw: boolean) {
        this._isSeparate = sw;
    }
    set addSheet( title: string ) {
        this._worksheet = this._workbook.addWorksheet(title);
        this._worksheet.properties.defaultColWidth = 15;
        this._title = title;
    }
    set data(data: ChecksDTO[]) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    public addWorksheet( title: string ) {
        this._worksheet = this._workbook.addWorksheet(title);
        this._worksheet.properties.defaultColWidth = 15;
    }
    private setTitle(titleValue: string) {
        
        this._worksheet.mergeCells('A1:D1');
        const titleCell = this._worksheet.getCell('A1')
        titleCell.value = titleValue;
        
        titleCell.font = {bold: true, size: 14}
        titleCell.alignment = { horizontal: 'center' }
    }

    private setHeader(  ) {
        this._worksheet.getCell('A2').value = 'EMPLEADO';
        this._worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };
        this._worksheet.getCell('A2').font = {bold: true, size: 8}
        this._worksheet.getCell('B2').value = 'FECHA';
        this._worksheet.getCell('B2').alignment = { horizontal: 'center', vertical: 'middle' };
        this._worksheet.getCell('B2').font = {bold: true, size: 8}
        this._worksheet.getCell('C2').value = 'HORA';
        this._worksheet.getCell('C2').alignment = { horizontal: 'center', vertical: 'middle' };
        this._worksheet.getCell('C2').font = {bold: true, size: 8}
        this._worksheet.getCell('D2').value = 'DETALLE';
        this._worksheet.getCell('D2').alignment = { horizontal: 'center', vertical: 'middle' };
        this._worksheet.getCell('D2').font = {bold: true, size: 8}
    } 
    generateExcel( ) {        
        this._worksheet.getColumn('A').width = 25;
        this._worksheet.getColumn('B').width = 10;
        this._worksheet.getColumn('C').width = 8;
        this._worksheet.getColumn('D').width = 10;
        this.setTitle(this._title);
        this.setHeader( );
        let numRow = this._worksheet.rowCount;
        this.data.forEach( ( item, index ) => {    
            const row = this._worksheet.getRow(numRow + index + 1);
            row.getCell('A').value = item.employee;
            row.getCell('B').value = item.checkDate.toISOString().split('T')[0];
            row.getCell('C').value = item.checkTime.toISOString().split('T')[1].split('.')[0];
            row.getCell('D').value = item.description;
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
}
