import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-about-hourly-tracking',
  templateUrl: './about-hourly-tracking.component.html',
  styleUrls: ['./about-hourly-tracking.component.css']
})
export class AboutHourlyTrackingComponent implements OnInit {

   public company: string;
  public product: string;

 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }



  ngOnInit() {
  }

}
