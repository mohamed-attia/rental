import * as moment from "moment";

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { RequestRentalService } from "../../service/request-rental-service";
import { Router } from '@angular/router';

@Component({
  selector: "app-requestrentalspopup",
  templateUrl: "./request-confirmation-popup.html",
})
export class ReqRentConfirmPopupComponent implements OnInit {
  @Input() showModal;
  @Output() closeModal = new EventEmitter<boolean>();
  public requestResponseData = {};
  showPaymentModal = false;
  time: any;
  qrImage: any;
  date: any;
  constructor(private requestRentalService: RequestRentalService, private router:Router) {}

  ngOnInit() {
    this.requestRentalService
      .getRequestResponseRentalData()
      .subscribe((res) => {
        // debugger
        console.log("requestData", res);
        this.requestResponseData = res;
        this.qrImage = `data:image/png' + ';base64,' + ${this.requestResponseData["qrCode"]}`;
        this.getDateTime(this.requestResponseData["fromDate"]);
      });
  }
  public emitCloseModal() {
    this.showModal = false;
    this.closeModal.emit(false);
    this.router.navigate(["./rental-requests"]);
  }
  getDateTime(date) {
    date = new Date("2013-08-03T02:00:00Z");
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (min < 10) {
      min = "0" + min;
    }

    this.date = `${month}-${dt}-${year}`;
    this.time = `${hours}-${min}`;
  }
}
