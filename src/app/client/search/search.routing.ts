import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultsComponent } from "app/client/search/search-results.component";
import { SearchComponent } from "app/client/search/search.component";

const routes: Routes = [
    {
        path: '',
         component:SearchComponent,
    },
    {
        path: 'search-results',
        component:SearchResultsComponent,
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
