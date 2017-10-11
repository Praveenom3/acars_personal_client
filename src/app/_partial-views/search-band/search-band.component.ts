import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment, RouterState } from "@angular/router";
import { SearchScreenService } from 'app/_services/_search-screen.service';

@Component({
  selector: 'search-band',
  templateUrl: './search-band.component.html',
  styleUrls: ['./search-band.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBandComponent implements OnInit {
  all: number = 0;
  module: string;
  searchParam: any;
  alphaArray: any[] = [];
  countsArr: any[] = [];
  popupArray: any[] = [];
  constructor(private router: Router, private searchScreenService: SearchScreenService) {

    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;

    let url: string = snapshot.url;
    const tree: UrlTree = router.parseUrl(url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.module = s[0].path;

  }

  ngOnInit() {
    this.getUsersCount();
    let str = "abcdefghijklmnopqrstuvwxyz";
    this.alphaArray = str.split("");
  }
  /**
   * 
   */
  searchData() {
    this.searchParam = this.searchParam ? this.searchParam : '';
    this.router.navigate(['/admin/search/search-results'], { queryParams: { keyword: this.searchParam } });
  }

  getUsersCount() {
    this.searchScreenService.getUsersCount()
      .subscribe((counts) => {
        if (counts) {
          this.all = counts.total['total'];
          if (counts.alphaCounts.length > 0) {
            this.countsArr = counts.alphaCounts;
            this.alphaArray.forEach((alphabet, alphaIndex) => {
              this.popupArray[alphabet] = 0;
              this.countsArr.forEach((countAlpha, countIndex) => {
                if (countAlpha['name'] == alphabet) {
                  this.popupArray[alphabet] = countAlpha['total'];
                }
              });
            });
          }
        }
      });
  }
}
