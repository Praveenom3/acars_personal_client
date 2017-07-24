import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',  
})
export class ClientLayoutComponent implements OnInit {

vht:string = '';
aca16:string ='';
aca17:string ='';

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

constructor() { }

  ngOnInit() {
  }

}
