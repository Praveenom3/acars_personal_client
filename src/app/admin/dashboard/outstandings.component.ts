import {
    Component, OnInit
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from "ngx-toastr";
import { OutstandingsService } from "app/_services/_outstandings.service";
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';

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
        private dashboardService: ClientDashBoardService, ) {
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
}