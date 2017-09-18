import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
   public company: string;
  public product: string;

  // Pie
  public pieChartLabels:string[] = ['Trending Ineligible', 'Trending Eligible'];
  public pieChartData:number[] = [956, 235];
   public pieChartData2:number[] = [125, 41];
  public pieChartType:string = 'pie';
  //public piechartcolors:string[] = ['rgb(93, 188, 210)','rgb(254, 146, 39)'];
public Chart12:Array<any> = [];

 public ChartColors:Array<any> = [
    { // bLUE
      backgroundColor: ['rgb(254, 146, 39)','rgb(93, 188, 210)'],
      borderColor:   ['rgb(254, 146, 39)','rgb(93, 188, 210)'],
      pointBackgroundColor: ['rgb(254, 146, 39)','rgb(93, 188, 210)'],
      pointBorderColor: ['#FE9227','#5DBCD2'],
      pointHoverBackgroundColor: ['#FE9227','#5DBCD2'],
      pointHoverBorderColor:  ['rgb(254, 146, 39)','rgb(93, 188, 210)'],
    },
    // { // Orange
    //   backgroundColor: 'rgb(254, 146, 39)',
    //   borderColor: 'rgb(254, 146, 39)',
    //   pointBackgroundColor: 'rgb(254, 146, 39)',
    //   pointBorderColor: '#FE9227',
    //   pointHoverBackgroundColor: '#FE9227',
    //   pointHoverBorderColor: 'rgb(254, 146, 39)'
    // },
   
     
   
  ];


  //  public piechartcolors:Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgb(249, 159, 32)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
   
  // ];

 
 constructor(route: ActivatedRoute) { 
   // this.product = route.snapshot.params['product'];
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
    
  }

  ngOnInit() {

   

  }

    // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
