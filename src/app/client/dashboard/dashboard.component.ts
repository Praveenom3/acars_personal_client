import { Component, OnInit } from '@angular/core';

import {Http} from "@angular/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
})
export class DashboardComponent implements OnInit {
 
    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    constructor(private http: Http) {
    }

    ngOnInit(): void {
       // this.http.get("./dashboard/data.json")
        this.http.get("https://jsonplaceholder.typicode.com/users")
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data = data.json();
                }, 1000);
            });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.username.length;
    }
}
