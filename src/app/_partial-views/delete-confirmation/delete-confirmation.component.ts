import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
  exportAs: 'child'
})
export class DeleteConfirmationComponent implements OnInit {

  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @Output() confirmed = new EventEmitter();

  onClick($event){
    this.confirmed.emit($event);
  }

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.deleteModal.show();
  }
  hide() {
    this.deleteModal.hide();
  }

}
