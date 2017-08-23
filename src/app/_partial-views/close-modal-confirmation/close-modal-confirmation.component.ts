import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'app-close-modal-confirmation',
  templateUrl: './close-modal-confirmation.component.html',
  styleUrls: ['./close-modal-confirmation.component.css'],
  exportAs: 'child'
})
export class CloseModalConfirmationComponent implements OnInit {

  @ViewChild('closeConfirmationModal') public closeConfirmationModal: ModalDirective;
  @Output() confirmed = new EventEmitter();

  onClick($event){
    this.confirmed.emit($event);
  }

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.closeConfirmationModal.show();
  }
  hide() {
    this.closeConfirmationModal.hide();
  }

}
