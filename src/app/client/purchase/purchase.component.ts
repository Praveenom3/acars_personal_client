import { Component, OnInit } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PurchaseService } from "app/_services/_purchase.service";
import { Http } from "@angular/http";
import { ModalDirective } from "ngx-bootstrap";
import { Purchase } from "app/_models/purchase";

declare var $:any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent implements OnInit {
    
  private _errorMessage: string;
  public purchases: Purchase[];
  public invoicePaidStatus: any[] = ["No","Yes"];
  constructor(private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private purchaseService: PurchaseService,
        private toastrService: ToastrService,
        private _http: Http) {
    }

  ngOnInit() {
    this.fetchUserPurchases();
  }

  /**
   * Returns purchases of user
   */
  public fetchUserPurchases() {

      this.purchaseService.getUserPurchases()
            .subscribe((purchasesResponse) => {
                  this.purchases = purchasesResponse.purchases;
              },
            error => { this._errorMessage = error.data }
            );
  }
  
}
