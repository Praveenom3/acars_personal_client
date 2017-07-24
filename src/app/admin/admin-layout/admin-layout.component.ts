import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',  
})
export class AdminLayoutComponent implements OnInit {
  isMenuActive:boolean = false;
  isLinkActive:boolean = false;
  constructor() { }

  ngOnInit() {
  }

 //ToggleClass function functionality
  toggleClass(){
      this.isMenuActive = !this.isMenuActive;
      this.isLinkActive = !this.isLinkActive;
  }

}