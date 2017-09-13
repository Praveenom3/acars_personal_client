import {
    Component, OnInit
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { CustomToastrService } from "app/toaster/toaster-service";
import { OutstandingsService } from "app/_services/_outstandings.service";
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';
import { GlobalService } from "app/_services/_global.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './outstandings.component.html',
})

export class OutstandingsComponent implements OnInit {
    etype: any;
    data: any[];

    invoices: any;
    _errorMessage: any;
    invoicesData: any[];
    public invoicesFilterQuery = "";
    public rowsOnPage = 5;
    public sortOrder = "";
    public sortBy = "";

    constructor(private _outstandingsService: OutstandingsService,
        private dashboardService: ClientDashBoardService,
        private globalService: GlobalService,
        private toastrService: ToastrService ) {
			this.globalService.getPermissions();
    }

    ngOnInit() {
        this.getOutstandingInvoices('1');
    }

    private getOutstandingInvoices(purpose) {
        this._outstandingsService.getOutstandingInvoices(purpose)
            .subscribe((invoices) => {
                if (invoices.length > 0) {
                    this.invoicesData = invoices;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
    /**
    * redirectToClientDashBoard
    */
    public redirectToClientDashBoard(client: any) {
        this.dashboardService.redirectToClientDashBoard(client);
    }

    toggleStatus(type, value){
        if(type == "Outstanding Invoices"){
            let data = {
                'type' : "Outstanding Invoices",
                'value' : value
            };

            this._outstandingsService.toggleStatus(data)
            .subscribe(
                result => {
                    if (result['success'] == true) {
                        this.toastrService.success('Status changed successfully');

                        this.invoicesData.splice(this.invoicesData.indexOf(value), 1);

                }                
            },
            error => { this._errorMessage = error.data }
            );

        }
    }
}
