import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.css']
})
export class EmailTemplatesComponent implements AfterViewInit {

  constructor() { }
editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#email_description',
      plugins: ['link', 'paste', 'table','textcolor','textpattern','advlist','autolink', 'autosave', 'link', 'image' ,'lists', 'charmap', 'print', 'preview', 'hr', 'anchor','pagebreak','searchreplace', 'wordcount', 'visualblocks' ,'visualchars', 'code' ,'fullscreen', 'insertdatetime' ,'media', 'nonbreaking'],
      toolbar1:'undo redo insert styleselect bold italic alignleft aligncenter alignright alignjustify',
      toolbar2:' bullist numlist outdent indent link image forecolor backcolor emoticons fontselect fontsizeselect codesample help',
      skin_url: 'assets/skins/lightgray',
      height : 300,
      setup: editor => {
        this.editor = editor;
      },
    });
  }

}
