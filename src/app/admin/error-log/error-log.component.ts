import { Component, OnInit } from '@angular/core';
import { ErrorLogService } from "app/_services/_error-log.service";
import { ErrorLog } from "app/_models/error-log";

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {

  public errorLogs: ErrorLog[];
  
  public rowsOnPage = 10;
  public sortOrder = "asc";
  public sortBy = "";
  private _errorMessage:string = '';

  constructor(private ErrorLogService: ErrorLogService) { 
    
  }

    ngOnInit() {
      this.getErrorLog();
    }

  
    /*getting ErrorLog from service*/
    private getErrorLog()
    {
        this.ErrorLogService.getErrorLog()
            .subscribe((errorLogs)=>{
                this.errorLogs = errorLogs;
        },
        error =>{ this._errorMessage = error.data}
      );
    }  
}