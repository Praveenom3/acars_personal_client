import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchScreenService } from 'app/_services/_search-screen.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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

}