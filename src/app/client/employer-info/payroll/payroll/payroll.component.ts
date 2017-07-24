import { Component, OnInit,Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

 const URL = '/api/';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})


@Directive({ selector: '[ng2FileSelect,ng2FileDrop]' })

export class PayrollComponent implements OnInit  {
  company: string;
  product: string;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
 
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

   public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
