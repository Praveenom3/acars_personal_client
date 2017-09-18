import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

   public company: string;
  public product: string;

 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }


  ngOnInit() {
  }

}
