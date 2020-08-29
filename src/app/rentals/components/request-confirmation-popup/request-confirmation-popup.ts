import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-requestrentalspopup",
  templateUrl: "./request-confirmation-popup.html",
})
export class ReqRentConfirmPopupComponent implements OnInit {
  @Input() showModal;
  @Output() closeModal = new EventEmitter<boolean>();

  showPaymentModal = false;
  constructor() {}

  ngOnInit() {}
  public emitCloseModal() {
    this.showModal = false;
    this.closeModal.emit(false);
  }
}
