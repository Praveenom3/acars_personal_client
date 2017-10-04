import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import * as Globals from 'app/_shared/_globals';

declare var $:any;

@Component({
 selector: 'app-file-review',
  templateUrl: './file-review.component.html', 
})
export class FileReviewComponent implements OnInit {

  hasReplyClicked= false;

  ngOnInit() { 
    $('.table').dataTable({
        "paging":   false,
        "searching": false,
        "info":     false
        });
    }
}

