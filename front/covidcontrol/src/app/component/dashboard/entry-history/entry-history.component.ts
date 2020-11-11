import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntryService } from 'src/app/service/service/entry/entry.service';
import { EntryHistory } from 'src/app/model/entry-history.model';

@Component({
  selector: 'app-entry-history',
  templateUrl: './entry-history.component.html',
  styleUrls: ['./entry-history.component.scss']
})
export class EntryHistoryComponent implements OnInit {

  private filterForm: FormGroup;
  private rows: EntryHistory[];

  constructor(private entryService: EntryService, 
              private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setRows();
  }

  public getFilterForm(): FormGroup {
    return this.filterForm;
  }

  public getCols(): string[] {
    return environment.VALUE.ENTRY_HISTORY.COLUMN;
  }

  public getRows(): EntryHistory[] {
    return this.rows;
  }

  public setRows(): void {
    this.entryService.getEntryHistory().then(result => {
      this.rows = result;
    });
  }

}
