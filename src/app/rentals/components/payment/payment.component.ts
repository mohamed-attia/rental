import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RequestRentalService } from "../../service/request-rental-service";
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
      name: ["", Validators.required],
      date: ["", Validators.required],
      insurance: ["", Validators.required],
      rentAmount: ["", Validators.required],
    });
  }

  public onSubmit(form: FormGroup) {
    this.emitClosePaymentModal();
    if (this.paymentForm.valid) {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
    }
  }

  public sendPaymentData() {
    this.requestRentalService.sendPaymentData({}).subscribe((res) => {
      console.log(res);
    });
  }
}
