import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-contract',
  templateUrl: './billing-contract.component.html',
  styleUrls: ['./billing-contract.component.css']
})
export class BillingContractComponent implements OnInit {

  constructor() { }
  ngOnInit() {

  }

public isSetup = false;
  /* add/remove form div in setup*/
 setup(): void {
   this.isSetup = true;
  }
  close():void{
      this.isSetup = false;
  }
  
}
