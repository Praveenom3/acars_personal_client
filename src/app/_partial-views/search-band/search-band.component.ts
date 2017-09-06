import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment, RouterState } from "@angular/router";

@Component({
  selector: 'search-band',
  templateUrl: './search-band.component.html',
  styleUrls: ['./search-band.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBandComponent implements OnInit {
  module: string;
  searchParam: any;

  constructor(router: Router) {

    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;

    let url: string = snapshot.url;
    const tree: UrlTree = router.parseUrl(url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.module = s[0].path; 

  }

  ngOnInit() {
    
  }

}
