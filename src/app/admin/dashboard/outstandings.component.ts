import {
    Component, OnInit
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from "ngx-toastr";
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
    outstandingContractsData: any[];
    discoverySessionData: any[];
    public invoicesFilterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "";
    public sortBy = "";

    constructor(private _outstandingsService: OutstandingsService,
        private dashboardService: ClientDashBoardService,
        private globalService: GlobalService,
        private toastrService: ToastrService) {
        this.globalService.getPermissions();
    }

    ngOnInit() {
        this.getOutstandingInvoices('1');
        this.getOutstandingContracts('3');
        this.getDiscoveryCalls('4');
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
     * 
     * @param purpose 
     */
    private getOutstandingContracts(purpose) {
        this._outstandingsService.getOutstandingInvoices(purpose)
            .subscribe((contratcts) => {
                if (contratcts.length > 0) {
                    this.outstandingContractsData = contratcts;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
    /**
     * 
     * @param purpose 
     */
    private getDiscoveryCalls(purpose) {
        this._outstandingsService.getOutstandingInvoices(purpose)
            .subscribe((discoverySession) => {
                if (discoverySession.length > 0) {
                    this.discoverySessionData = discoverySession;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
    /**
    * redirectToClientDashBoard
    */
    public redirectToClientDashBoard(client: any) {
        this.dashboardService.redirectToClientDashBoard(client, true);
    }

    toggleStatus(type, value) {

        let data = {
            'type': type,
            'value': value
        };

        this._outstandingsService.toggleStatus(data)
            .subscribe(
            result => {
                if (result['success'] == true) {
                    this.toastrService.success('Status changed successfully');
                    if (type == 'Outstanding Invoices') {
                        this.invoicesData.splice(this.invoicesData.indexOf(value), 1);
                    } else if (type == 'Client Agreements') {
                        this.outstandingContractsData.splice(this.outstandingContractsData.indexOf(value), 1);
                    } else if (type == 'Discovery Session') {
                        this.discoverySessionData.splice(this.discoverySessionData.indexOf(value), 1);
                    }
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
}
