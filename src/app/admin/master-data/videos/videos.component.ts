import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    $(document).ready(function(){
        $('#masterdata_link').addClass('page-active');
    });
  }

}
