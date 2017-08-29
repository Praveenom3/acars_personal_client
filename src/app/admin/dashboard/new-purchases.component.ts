import {Component, OnInit,ViewContainerRef} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from "ngx-toastr";
import { Http } from "@angular/http";
import { GlobalService } from "app/_services/_global.service";
import { OutstandingsService } from "app/_services/_outstandings.service";
import { OutstandingInvoice } from "app/_models/oustandingInvoice";
import { NewPurchases } from "app/_models/new-purchases";

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
    public invoicesFilterQuery = "";
    public rowsOnPage = 5;
    public sortOrder = "";
    public sortBy = "";

    constructor(private _outstandingsService: OutstandingsService) {
    }

    ngOnInit() {
        this.getPurchases('2');
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
}