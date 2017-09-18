import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = '/api/';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

    public company: string;
  public product: string;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;

    public hasAnotherDropZoneOver:boolean = false;
    
 constructor(route: ActivatedRoute) {    

   this.product = 'vht';
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
