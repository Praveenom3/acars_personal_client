import { Component, OnInit } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-admin-dashboard-nav',
  templateUrl: './admin-dashboard-nav.component.html',
  styleUrls: ['./admin-dashboard-nav.component.css']
})
export class AdminDashboardNavComponent implements OnInit {

  constructor(private globalService: GlobalService) {
    this.globalService.getPermissions();
  }

  ngOnInit() {
  }

}
