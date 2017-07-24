import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = '/api/';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  product: string;
  company: string;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;

  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

   public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  } 


}
