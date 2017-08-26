import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  public productId: any;
  public clientId: any
  constructor(public route: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.clientDashBoardService.productParams = route.snapshot.params['product'];
    this.clientDashBoardService.clientParams = route.snapshot.params['client'];
    this.clientDashBoardService.agreementStep = true;
    this.clientDashBoardService.setInformation()
  }

  ngOnInit() {
  }
  /**
   * 
   */
  backToPrimaryContract() {
    this.clientDashBoardService.agreementStep = false;
    this.clientDashBoardService.primaryContractStep = true;
    this.clientDashBoardService.setInformation()
  }
  /**
   * 
   */
  finalStep() {
    this.clientDashBoardService.agreementStep = false;
    this.clientDashBoardService.clientAsDefaultAgreement = true;
    let productId: any;
    let clientId: any;
    if (this.clientDashBoardService.productParams) {
      productId = this.clientDashBoardService.productParams.split('-');
      if (typeof productId[0] != 'undefined') {
        this.productId = productId[0]
      }
    }
    if (this.clientDashBoardService.clientParams) {
      clientId = this.clientDashBoardService.clientParams.split('-');// getting client from url
      if (typeof clientId[0] != 'undefined') {
        this.clientId = clientId[0]
      }
    }
    let postData = {
      "userId": localStorage.getItem('user_id'),
      "clientId": this.clientId,
      "productId": this.productId,
      "defaultBilling": this.clientDashBoardService.clientAsDefaultBilling,
      "billingModel": this.clientDashBoardService.billingContractModel,
      "defaultContractSign": this.clientDashBoardService.clientAsDefaultContractSign,
      "contractSignModel": this.clientDashBoardService.contractSignorModel,
      "defaultprimaryContract": this.clientDashBoardService.clientAsDefaultPrimaryContract,
      "primaryModel": this.clientDashBoardService.primaryContractModel,
    };

    this.clientDashBoardService.savePrimaryDetailsOfClient(postData).subscribe(
      result => {
        console.log(result);
        if (result.success) {
          this.setClientDetails(result.data);
        } else {
          this.toastrService.error('Trouble in updating primary details');
        }
      },
      error => {
        console.log(error);
      });

  }
  /**
   * 
   * @param result 
   */
  setClientDetails(result) {

    let products: any = JSON.parse(localStorage.getItem('productsAndClients'));
    let product = products[this.productId];
    if (product) {
      product['clients'][this.clientId]['primaryData'] = result[this.clientId];
      products[this.productId] = product;
      localStorage.setItem('productsAndClients', JSON.stringify(products));
      localStorage.getItem('productsAndClients')
    }
    let clientInfo = product['clients'][this.clientId];
    let clientId: number = clientInfo['client_id'];
    let clientName: string = clientInfo['client_name'];
    clientName = clientName.toLocaleLowerCase().replace(/\s+/g, "-");
    let productName: string = product.product_name.toLocaleLowerCase().replace(/\s+/g, "-");
    this.toastrService.success('Client purchase primary data updated successfully');
    this.router.navigate(['/client/' + product.product_id + '-' + productName + '-' + product.applicable_year + '/' + this.clientId + '-' + clientName + '/dashboard']);
  }
}
