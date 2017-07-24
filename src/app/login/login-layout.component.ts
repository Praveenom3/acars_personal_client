import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  // templateUrl: './login-layout.component.html', 
   template: '<router-outlet></router-outlet>', 
})
export class LoginLayoutComponent implements OnInit {

   constructor() { } 

  ngOnInit(): void { }

}
