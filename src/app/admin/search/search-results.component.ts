import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchScreenService } from 'app/_services/_search-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';
import { GlobalService } from 'app/_services/_global.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-search',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchResultsComponent implements OnInit {
  p: number = 1;
  key: any;
  _errorMessage: any;
  collection: any[] = [];
  
  searchData: any;

  constructor(private adminUserService: SearchScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: ClientDashBoardService,
    private globalService: GlobalService,
    private toastrService: ToastrService,
  ) {
    
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    route.queryParams.subscribe(
      data => {
        if (data['key']) {
          this.getSearchResults(data['key'], "key");
        } else if (data['keyword']) {
          this.getSearchResults(data['keyword'], "keyword");
        }
      }
    );

  }

  ngOnInit() {
    
  }

  getSearchResults(key, type) {
    this.adminUserService.getAdminSearchDetails(key, type)
      .subscribe((searchResults) => {
        if (searchResults) {
          this.collection = [];
          this.collection = searchResults;
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