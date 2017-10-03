import { Component, OnInit } from '@angular/core';
import { ErrorLogService } from "app/_services/_error-log.service";
import { ErrorLog } from "app/_models/error-log";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {

  public errorLogs: ErrorLog[];
  public errorLogsDelete: any[] = [];
  public rowsOnPage = 10;
  public sortOrder = "asc";
  public sortBy = "";
  private _errorMessage: string = '';
  public checkall: boolean;
  constructor(private ErrorLogService: ErrorLogService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.getErrorLog();
  }


  /*getting ErrorLog from service*/
  private getErrorLog() {
    this.ErrorLogService.getErrorLog()
      .subscribe((errorLogs) => {
        this.errorLogs = errorLogs;
      },
      error => { this._errorMessage = error.data }
      );
  }

  private checkAll(val) {
    if (val == true) {
      this.errorLogs.forEach((element, index) => {
        this.errorLogsDelete[element.id] = true;
      });
    } else {
      this.errorLogs.forEach((element, index) => {
        this.errorLogsDelete[element.id] = false;
      });
    }
  }

  private checkUncheckMainBox(val) {
    let checkedCount = 1;
    if (val == false) {
      this.checkall = false;
    } else if (val == true) {
      this.errorLogsDelete.forEach((element, index) => {
        if (element == true) {
          checkedCount++;
        }
      });
      if (checkedCount == this.errorLogs.length) {
        this.checkall = true;
      }
    }
  }

  private deleteErrorLog() {
    if (this.errorLogsDelete.length > 0) {
      this.ErrorLogService.massiveDelete(this.errorLogsDelete).subscribe(
        result => {
          if (result) {
            this.getErrorLog();
            this.toastrService.success('Successfully Deleted.');
          } else {
            this._errorMessage = 'Not Deleted.';
          }
        },
        error => {
        });
    }
  }
  
}