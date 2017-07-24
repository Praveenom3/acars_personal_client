import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-contract',
  templateUrl: './primary-contract.component.html',
  styleUrls: ['./primary-contract.component.css']
})
export class PrimaryContractComponent implements OnInit {

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
