import { Component, OnInit } from '@angular/core';
import { IdleTimeoutService } from "app/_services/_idle-timeout.service";

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',  
})
export class ClientLayoutComponent implements OnInit {

vht:string = '';
aca16:string ='';
aca17:string ='';

constructor(private _idleTimeout: IdleTimeoutService) { 
   _idleTimeout.init();
}

  ngOnInit() {
  }

changeStyle(arg){
  if(arg=='aca16')
  {
    this.vht= '';
    this.aca16 ='active';
    this.aca17='';
  }
  else if(arg=='aca17')
  {
    this.vht= '';
    this.aca16 ='';
    this.aca17='active';
  }
  else if(arg=='vht')
  {
    this.vht= 'active';
    this.aca16 ='';
    this.aca17='';
  }
}


}
