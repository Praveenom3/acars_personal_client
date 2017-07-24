import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from "app/client/search/search.routing";
import { SearchResultsComponent } from "app/client/search/search-results.component";
import { SearchComponent } from "app/client/search/search.component";
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    PartialViews
  ],
  declarations: [SearchResultsComponent,SearchComponent]
})
export class SearchModule { }
