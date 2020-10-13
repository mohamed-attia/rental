import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from 'src/app/rentals/service/rental.service';
import { RequestRentalService } from './../../rentals/service/request-rental-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: "app-payment-modal",
  templateUrl: "./payment.component.html",
})
export class PaymentComponent implements OnInit {
  @Input() showPaymentModal;
  @Input() paymentData;
  @Output() closePaymentModal = new EventEmitter<boolean>();
  public paymentForm: FormGroup;
  public requestdata:any;

  constructor(
    private requestRentalService: RequestRentalService,
    private fb: FormBuilder,
    private getRentalsListService: GetRentalsListService
  ) {}
  ngOnInit() {
    this.getRentalDetails();
    this.createPaymentForm();
  }

  private getRentalDetails(){
    this.getRentalsListService.getRentalData().subscribe((res) => {
      this.requestdata = res;
    });
  }

  public emitClosePaymentModal() {
    this.showPaymentModal = false;
    this.closePaymentModal.emit(false);
  }

  private createPaymentForm() {
    this.paymentForm = this.fb.group({
      name: ["", Validators.required],
      date: ["", Validators.required],
      totalInsurance: ["", Validators.required],
      rentAmount: ["", Validators.required],
    });
      this.patchPymentForm();
  }

  private patchPymentForm(){
    this.paymentForm.patchValue({
      name: this.paymentData.unit.name,
      date: new Date(this.paymentData.fromDate) ,
      totalInsurance: this.paymentData.unit.insurances,
      rentAmount: this.paymentData.unit.totalAmount,
    })
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
