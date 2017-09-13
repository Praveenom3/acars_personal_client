import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchScreenService } from 'app/_services/_search-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';
import { GlobalService } from 'app/_services/_global.service';
import { CustomToastrService } from "app/toaster/toaster-service";

@Component({
  selector: 'app-search',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchResultsComponent implements OnInit {
  key: any;
  _errorMessage: any;
  searchResults: any[] = [];

  searchData: any;

  constructor(private adminUserService: SearchScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: ClientDashBoardService,
    private globalService: GlobalService,
    private toastrService: CustomToastrService,
  ) {

    route.queryParams.subscribe(
      data => {
        this.key = data['key'];
        this.getSerachResults(this.key);
      }
    );

  }

  ngOnInit() {

  }

  getSerachResults(key) {
    this.adminUserService.getAdminSearchDetails(key)
      .subscribe((searchResults) => {
        if (searchResults) {
          this.searchResults = [];
          this.searchResults = searchResults;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }


  /**
   * redirectToClientDashBoard
   */
  public redirectToClientDashBoard(client: any) {
    this.dashboardService.redirectToClientDashBoard(client);
  }
}