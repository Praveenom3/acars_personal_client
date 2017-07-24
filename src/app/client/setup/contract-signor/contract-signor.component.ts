import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-signor',
  templateUrl: './contract-signor.component.html',
  styleUrls: ['./contract-signor.component.css']
})
export class ContractSignorComponent implements OnInit {

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
