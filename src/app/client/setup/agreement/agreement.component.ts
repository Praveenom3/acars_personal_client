import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";
@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  public productId: any;
  public clientId: any
  termsConditionsUrl: string;
  constructor(public route: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
    public globalService: GlobalService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.clientDashBoardService.productParams = this.globalService.decode(route.snapshot.params['product']);
    this.clientDashBoardService.clientParams = this.globalService.decode(route.snapshot.params['client']);
    this.clientDashBoardService.agreementStep = true;

  }

  ngOnInit() {
    this.clientDashBoardService.setBrandData();
    this.termsConditionsUrl = this.clientDashBoardService.brandInformation.terms_conditions_url;
    this.clientDashBoardService.setInformation()
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

    let postData = {
      "userId": localStorage.getItem('user_id'),
      "clientId": this.clientDashBoardService.clientParams,
      "productId": this.clientDashBoardService.productParams,
      "defaultBilling": this.clientDashBoardService.clientAsDefaultBilling,
      "billingModel": this.clientDashBoardService.billingContractModel,
      "defaultContractSign": this.clientDashBoardService.clientAsDefaultContractSign,
      "contractSignModel": this.clientDashBoardService.contractSignorModel,
      "defaultprimaryContract": this.clientDashBoardService.clientAsDefaultPrimaryContract,
      "primaryModel": this.clientDashBoardService.primaryContractModel,
    };

    this.clientDashBoardService.savePrimaryDetailsOfClient(postData).subscribe(
      result => {
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
    this.clientDashBoardService.initDashBoardVaraibles();
    let productSession: any = JSON.parse(localStorage.getItem('productsAndClients'));
    let products: any = productSession['products'];
    let productId = this.clientDashBoardService.productParams;
    let product = products[productId];
    let clientId = this.clientDashBoardService.clientParams;

    if (product) {
      product['clients'][clientId]['primaryData'] = result[clientId];
      products[productId] = product;
      productSession['products'] = products;
      localStorage.setItem('productsAndClients', JSON.stringify(productSession));
    }

    this.toastrService.success('Client purchase primary data updated successfully');
    this.router.navigate(['/client/' + this.globalService.encode(productId) + '/' + this.globalService.encode(clientId) + '/dashboard']);
  }
}
