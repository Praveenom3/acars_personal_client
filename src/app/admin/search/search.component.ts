import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SearchScreenService } from 'app/_services/_search-screen.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  _errorMessage: any;
  searchResults: any;

  searchData:any;

  constructor(private adminUserService: SearchScreenService) { 

  }


  ngOnInit() {
    

    this.adminUserService.getAdminSearchDetails()
    .subscribe((searchResults)=>{
        this.searchResults = searchResults;
    },
    error => { this._errorMessage = error.data }
    );

    console.log(this.searchData);
 }
 

}




@Component({
  selector: 'app-search',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchResultsComponent implements OnInit {

 
  constructor() { }
  
    ngOnInit() {
    }

}