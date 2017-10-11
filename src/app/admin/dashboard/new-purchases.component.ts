import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from "ngx-toastr";
import { Http } from "@angular/http";
import { GlobalService } from "app/_services/_global.service";
import { OutstandingsService } from "app/_services/_outstandings.service";
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './new-purchases.component.html',
})

export class NewPurchasesComponent implements OnInit {
    etype: any;
    data: any[];

    purchases: any;
    _errorMessage: any;
    purchasesData: any[];
    signedPurchasesData: any[];
    public invoicesFilterQuery = "";
    public signedPurchasesQuery = "";

    public rowsOnPage = 20;
    public sortOrder = "";
    public sortBy = "";

    constructor(private _outstandingsService: OutstandingsService,
        private dashboardService: ClientDashBoardService, ) {
    }

    ngOnInit() {
        this.getPurchases('2');
        this.getSignedPurchases();
    }

    private getPurchases(purpose) {
        this._outstandingsService.getOutstandingInvoices(purpose)
            .subscribe((purchases) => {
                if (purchases.length > 0) {
                    this.purchasesData = purchases;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
    /**
     * 
     */
    private getSignedPurchases() {
        this._outstandingsService.getSignedPurchases()
            .subscribe((purchases) => {
                if (purchases.length > 0) {
                    this.signedPurchasesData = purchases;
                }
            },
            error => { this._errorMessage = error.data }
            );
    }
    /**
   * redirectToClientDashBoard
   */
    public redirectToClientDashBoard(purchase: any) {
        this.dashboardService.redirectToClientDashBoard(purchase, true);
    }
}
