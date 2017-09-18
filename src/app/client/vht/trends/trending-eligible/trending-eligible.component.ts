import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-trending-eligible',
  templateUrl: './trending-eligible.component.html',
  styleUrls: ['./trending-eligible.component.css']
})
export class TrendingEligibleComponent implements OnInit {
  value: any;
  type: any;

  public company: string;
  public product: string;

     csvUrl: string; // URL to web API
   
   csvData: any[] = [];
 public filterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "asc";
    public sortBy = "";

 constructor(route: ActivatedRoute,private  http: Http) { 
       this.product = 'vht';
    this.company = route.snapshot.params['company'];
      this.type = route.snapshot.queryParams['type'];
        this.value = route.snapshot.queryParams['value'];

   }

  ngOnInit() {
    if(this.type == 'Standard'){
       this.csvUrl = 'assets/csv/SMP_Trending.csv';
    }else{
       this.csvUrl = 'assets/csv/IMP_Trending.csv';
    }
    this.readCsvData();
  }

  readCsvData () {
    this.http.get(this.csvUrl)
    .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
    );
  }


 private extractData(res: Response) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    this.csvData = lines;

    console.log( this.csvData );
  }


 private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
