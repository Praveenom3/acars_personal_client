import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public company: string;
  public product: string;

 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }



  ngOnInit() {
  }

}
