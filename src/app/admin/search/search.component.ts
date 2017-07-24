import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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