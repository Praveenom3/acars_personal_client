import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employeesdetails',
  templateUrl: './employeesdetails.component.html',
  styleUrls: ['./employeesdetails.component.css']
})
export class EmployeesdetailsComponent implements OnInit {
    id: any;
    employeedDetails:Array<any>;
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

 public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgb(254, 146, 39)',
      borderColor: 'rgb(254, 146, 39)',
      pointBackgroundColor: 'rgb(254, 146, 39)',
      pointBorderColor: '#FE9227',
      pointHoverBackgroundColor: '#FE9227',
      pointHoverBorderColor: 'rgb(254, 146, 39)'
    },
   
  ];
  public company: string;
  public product: string;

  public eName:any;
  public eId:any;
  public eType:any;
  public empData:any;


 public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56], label: 'Worked Hours'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];


 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
     this.id = route.snapshot.queryParams['id'];
  }


  ngOnInit() {
    if(this.id == 1){

      this.eName = 'Kamden Abbott';
      this.eId = '255-74-7402';
      this.eType = ['Standard Measurement','Initial Measurement','Initial Measurement'];

      this.employeedDetails = [{'date':'1/1/2016 to 12/31/2016',
                                  'mst':'1/1/2016',
                                  'med':'12/31/2016',
                                  'total_hours':'1045',
                                  'avg_hours':'87.08',
                                  'qualified':'NO',
                                  'ast':'1/1/2017',
                                  'aed':'1/31/2017',
                                  'stsd':'2/1/2017',
                                  'sted':'1/31/2018',
                                  'barChartData':[165, 171, 14, 0, 0, 12, 145, 156, 110, 131, 141, 0]},
                                  {'date':'1/1/2016 to 3/31/2016',
                                  'mst':'1/1/2016',
                                  'med':'3/31/2016',
                                  'total_hours':'350',
                                  'avg_hours':'116.67',
                                  'qualified':'NO',
                                  'ast':'1/1/2017',
                                  'aed':'1/31/2017',
                                  'stsd':'2/1/2017',
                                  'sted':'1/31/2018',
                                  'barChartData':[165, 171, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
                                  {'date':'7/1/2016 to 11/30/2016',
                                  'mst':'7/1/2016',
                                  'med':'11/30/2016',
                                  'total_hours':'683',
                                  'avg_hours':'136.6',
                                  'qualified':'NO',
                                  'ast':'NA',
                                  'aed':'NA',
                                  'stsd':'NA',
                                  'sted':'NA',
                                'barChartData':[145, 156, 110, 131, 141, 0, 0, 0, 0, 0, 0, 0]},
                                  ];    

    this.empData = this.employeedDetails[0];
    this.barChartData = [
                        {data: this.empData.barChartData,
                         label: 'Worked Hours'},
   
                      ];
    }else{

      this.eName = 'Standard';
      this.eId = '105-78-2247';
      this.eType = ['Standard Measurement','Standard Measurement','Initial Measurement'];

       this.employeedDetails = [{'date':'1/1/2017 to 12/31/2017',
                                  'mst':'1/1/2017',
                                  'med':'12/31/2017',
                                  'total_hours':'969',
                                  'avg_hours':'138.43',
                                  'qualified':'NO',
                                  'ast':'1/1/2017',
                                  'aed':'1/31/2017',
                                  'stsd':'2/1/2017',
                                  'sted':'1/31/2018',
                                  'barChartData':[157, 163, 117, 123, 110, 146, 153, 0, 0, 0, 0, 0]},
                                  {'date':'1/1/2016 to 12/31/2016',
                                  'mst':'1/1/2016',
                                  'med':'12/31/2016',
                                  'total_hours':'1650',
                                  'avg_hours':'137.50',
                                  'qualified':'NO',
                                  'ast':'1/1/2017',
                                  'aed':'1/31/2017',
                                  'stsd':'2/1/2017',
                                  'sted':'1/31/2018',
                                  'barChartData':[165, 171, 125, 131, 118, 154, 161, 112, 151, 130, 114, 118]},
                                   {'date':'1/1/2016 to 12/31/2016',
                                  'mst':'1/1/2016',
                                  'med':'12/31/2016',
                                  'total_hours':'1650',
                                  'avg_hours':'137.50',
                                  'qualified':'NO',
                                  'ast':'1/1/2017',
                                  'aed':'1/31/2017',
                                  'stsd':'2/1/2017',
                                  'sted':'1/31/2018',
                                  'barChartData':[165, 171, 125, 131, 118, 154, 161, 112, 151, 130, 114, 118]},                                 
                                  ];

       this.empData = this.employeedDetails[0];
    this.barChartData = [
                        {data: this.empData.barChartData,
                         label: 'Worked Hours'},
   
                      ];                            

    }

  }


onChange(id){
  let value = (id.srcElement || id.target).value;
  this.empData = this.employeedDetails[value];
   this.barChartData = [
                        {data: this.empData.barChartData,
                         label: 'Worked Hours'},
   
                      ];

}


 
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
