import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from "app/client/search/search.routing";
import { SearchResultsComponent } from "app/client/search/search-results.component";
import { SearchComponent } from "app/client/search/search.component";

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [SearchResultsComponent,SearchComponent]
})
export class SearchModule { }
