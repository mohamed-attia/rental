import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-requestrentalspopup",
  templateUrl: "./request-confirmation-popup.html",
})
export class ReqRentConfirmPopupComponent implements OnInit {
  @Input() showModal;
  @Input() requestData;
  @Output() closeModal = new EventEmitter<boolean>();

  showPaymentModal = false;
  constructor() {}

  ngOnInit() {
    console.log('requestData',this.requestData)
  }
  public emitCloseModal() {
    this.showModal = false;
    this.closeModal.emit(false);
  }
}
