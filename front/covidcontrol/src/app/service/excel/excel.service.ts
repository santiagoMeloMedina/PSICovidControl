import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  private saveAsExcelFile(buffer: any, name: string): void {
    const data: Blob = new Blob([buffer], {
      type: environment.VALUE.ENTRY_HISTORY.EXCEL.TYPE
    });
    FileSaver.saveAs(data, name);
  }

  public exportAsExcelFile(json: any[], name: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, name);
  }
}
