import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from '../../service/rental.service';
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
      name: this.requestdata.rentalName,
      date: `${this.requestdata.fromDate.year} - ${this.requestdata.fromDate.month} - ${this.requestdata.fromDate.day}` ,
      totalInsurance: this.requestdata.totalInsurance,
      rentAmount: this.requestdata.amount,
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
