import { Component, OnInit } from "@angular/core";
import { Subscription, timer } from 'rxjs';

import { LanguageUpdateService } from "src/app/shared/providers/language/language.service";
import { RentalRequestsUserService } from "../services/rental-requests.service";
import { RequestModel } from "../models/request.model";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-rental-requests",
  templateUrl: "./rental-requests.component.html",
})
export class RentalRequestsComponent implements OnInit {
  public requests: RequestModel[] = [];
  pendingRequests: RequestModel[] = [];
  ApprovedRequests: RequestModel[] = [];
  OnGoingRequests: RequestModel[] = [];
  RejectedRequests: RequestModel[] = [];
  ExpiredRequests: RequestModel[] = [];
  CanceledRequests: RequestModel[] = [];
  TempRequestList: RequestModel[] = [];
  public RequestType = "history";
  showPaymentModal = false;
  paymentData = {};
  time: string;
  countDown:Subscription;
  counter = 1800;
  tick = 1000;
  constructor(
    private rentalRequestsUserService: RentalRequestsUserService,
    private languageUpdateService: LanguageUpdateService
  ) {
    this.rentalRequestsUserService.setHeaderTitle("RentalRequests.Reuests");
    this.languageUpdateService.setMenuItem("request");
  }

  ngOnInit() {
    this.countDown = timer(0, this.tick)
    .subscribe(() => --this.counter)
    this.getRentalRequests();
  }

  private getRentalRequests() {
    this.rentalRequestsUserService.getRentalRequests().subscribe((res) => {
      this.requests = res["body"]["result"];
      this.TempRequestList = this.requests;
      this.filterRequest(this.requests);
    });
  }
  private cancelRequest(index,requestNumber) {
    let cancelObj = {
        "status": 6,
        "requestNumber": requestNumber,
        "userId": Number(localStorage.getItem('userId'))
    }
    this.rentalRequestsUserService.cancelRequest(cancelObj).subscribe((res) => {
      // console.log(res);
      this.getRentalRequests();
      this.switchRequest('history');
      this.RequestType = 'history'
      this.pendingRequests.splice(index,1)
      Swal.fire(
        "Success",
        'Request Canceled successfully',
        "success"
      );
    },(error)=>{
      Swal.fire(
        "Error",
        `${error["error"]["error"]["message"]}`,
        "Error"
      );
    });
  }

  filterRequest(requests: RequestModel[]) {
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].status === 1) {
        this.pendingRequests.push(requests[i]);
      } else if (requests[i].status === 2) {
        this.ApprovedRequests.push(requests[i]);
      } else if (requests[i].status === 3) {
        this.OnGoingRequests.push(requests[i]);
      } else if (requests[i].status === 4) {
        this.RejectedRequests.push(requests[i]);
      } else if (requests[i].status === 5) {
        this.ExpiredRequests.push(requests[i]);
      } else if (requests[i].status === 6) {
        this.CanceledRequests.push(requests[i]);
      }
    }
  }

  public selectedRequestType(filterType) {
    this.RequestType = filterType;
    this.switchRequest(filterType);
  }

  switchRequest(type: string) {
    switch (type) {
      case "pending":
        this.TempRequestList = [...this.pendingRequests];
        break;
      case "approved":
        this.TempRequestList = [...this.ApprovedRequests];
        break;
      case "ongoing":
        this.TempRequestList = [...this.OnGoingRequests];
        break;
      case "expired":
        this.TempRequestList = [...this.ExpiredRequests];
        break;
      case "canceled":
        this.TempRequestList = [...this.CanceledRequests];
        break;
      case "reject":
        this.TempRequestList = [...this.RejectedRequests];
        break;
      case "history":
        this.TempRequestList = [...this.requests];
        break;
    }
  }
  openDirection(lat,lng){
    const url = "https://maps.google.com/?q=" + lat + "," + lng;
    window.open(url);
  }

   timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    this.time =   rhours + " H(s)." + ' / '+ rminutes + " M(s).";
    }

    setTimeOut(time){
      let newtime = time
     setInterval(()=>{
      newtime = newtime - 1;
       this.timeConvert(newtime)
     },10000)
    //  return this.time;
    }

    closePaymentModal(e){
      this.showPaymentModal = false;
    }

    sendPaymentData(request){
      // this.showPaymentModal = true
      // this.paymentData = request
      Swal.fire(
        "Thank you...",
        `Payment done`,
        "success"
      );
    }

    ngOnDestroy(){
      this.countDown=null;
    }

}
