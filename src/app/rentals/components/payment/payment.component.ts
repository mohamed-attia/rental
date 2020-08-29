import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RequestRentalService } from "../../service/request-rental-service";

@Component({
  selector: "app-payment-modal",
  templateUrl: "./payment.component.html",
})
export class PaymentComponent implements OnInit {
  @Input() showPaymentModal;
  @Output() closePaymentModal = new EventEmitter<boolean>();
  public paymentForm: FormGroup;

  constructor(
    private requestRentalService: RequestRentalService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.createPaymentForm();
  }

  public emitClosePaymentModal() {
    this.showPaymentModal = false;
    this.closePaymentModal.emit(false);
  }

  private createPaymentForm() {
    this.paymentForm = this.fb.group({
      1: ["", Validators.required],
      2: ["", Validators.required],
      3: ["", Validators.required],
      4: ["", Validators.required],
    });
  }

  public onSubmit(form: FormGroup) {
    if (this.paymentForm.valid) {
    }
  }

  public sendPaymentData() {
    this.requestRentalService.sendPaymentData({}).subscribe((res) => {
      console.log(res);
    });
  }
}
