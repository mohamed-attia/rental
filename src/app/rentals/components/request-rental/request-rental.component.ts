import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from "../../service/rental.service";
import { RequestRentalModel } from '../../models/request-rental.model';
import { RequestRentalService } from 'src/app/rentals/service/request-rental-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subject, zip as observableZip } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./request-rental.component.html",
  encapsulation: ViewEncapsulation.None
})
export class RequestRentalComponent implements OnInit {
  public requestdata: any = {};
  public isGuest = false;
  public isUser = false;
  public requestRentalform: FormGroup;
  public familyOrSinglesValue = false;
  public showmodal = false;
  public showPayment = false;
  public requestRental: RequestRentalModel = {images:[{}]};
  public totalsizeOfimages = 10000000;
  public uploadedFileList = [];
  public loading = false;
  public imagesData = [];
  public showRequestRentalconfirmation = false;
  public showPaymentModal= false;
  public responseRequestData = {};
  validaImages: boolean = true;
  public fromDate:any;
  public toDate:any;
  myFiles = [];
  constructor(
    private getRentalsListService: GetRentalsListService,
    private fb: FormBuilder,
    private requestRentalService: RequestRentalService
  ) {
    if (localStorage.getItem("accessToken")) {
      this.isUser = true;
    }
  }

  ngOnInit() {
    this.getRentalData();
  }

  private getUSerInfo(){
    this.requestRentalform.get('user').get('fullName').setValue(localStorage.getItem('name'));
    this.requestRentalform.get('user').get('emailAddress').setValue(localStorage.getItem('emailAddress'));
    this.requestRentalform.get('user').get('phoneNumber').setValue(localStorage.getItem('phoneNumber'));
    this.requestRentalform.get('user').get('address').setValue(localStorage.getItem('address'));
  }

  private getRentalData() {
    this.getRentalsListService.getRentalData().subscribe(res => {
      this.requestdata = res;
      // debugger
      if(this.requestdata !== null && this.requestdata !== undefined && Object.keys(this.requestdata).length !== 0){
        this.createForm();
      }
    });
  }

  public monthMaping(month) {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }

  private createForm() {
    this.requestRentalform = this.fb.group({
    unitType: [""],
    TotalAmount: this.requestdata.amount,
    totalInsurance: this.requestdata.totalInsurance,
    status: this.requestdata.status,
    note: "",
    paymentStatus: 1,
    paymentNote: "",
    unitId: this.requestdata.unitId,
      user: this.fb.group({
      fullName: ["", Validators.required],
      id: "",
      userName: "",
      emailAddress: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: "",
      tenantId: +localStorage.getItem("tenantId"),
      acceptTermsAndConditions: true,
      address: ["", Validators.required],
      setRandomPassword: "",
      shouldChangePasswordOnNextLogin: true,
      isGuest: "",
      }),
    });

  // this.requestRentalform = this.fb.group({
  //   unitType: [""],
  //   TotalAmount: [this.requestdata.amount],
  //   insurance: [this.requestdata.insurance],
  //   status: this.requestdata.status,
  //   note: "",
  //   paymentStatus: 1,
  //   paymentNote: "",
  //   unitId: this.requestdata.unitId,
  //   fromDate: new Date(`${this.requestdata.fromDate.year}-${this.requestdata.fromDate.month}-${this.requestdata.fromDate.day}`).toISOString(),
  //   toDate: new Date(`${this.requestdata.toDate.year}-${this.requestdata.toDate.month}-${this.requestdata.toDate.day}`).toISOString(),
  //   user: this.fb.group({
  //     fullName: ["", Validators.required],
  //     id: "",
  //     userName: "",
  //     emailAddress: ["", Validators.required],
  //     phoneNumber: ["", Validators.required],
  //     password: "",
  //     tenantId: +localStorage.getItem("tenantId"),
  //     acceptTermsAndConditions: true,
  //     address: ["", Validators.required],
  //     setRandomPassword: "",
  //     shouldChangePasswordOnNextLogin: true,
  //     isGuest: "",
  //   }),
  // });

  if(this.isUser){
    this.getUSerInfo();
    }

  }

  public onSubmit(form: FormGroup) {
    this.fromDate = new Date(Number(this.requestdata.fromDate.year),Number(this.requestdata.fromDate.month),Number(this.requestdata.fromDate.day));
    this.toDate = new Date(Number(this.requestdata.toDate.year),Number(this.requestdata.toDate.month),Number(this.requestdata.toDate.day));
    this.requestRentalform.get("user").get("userName").setValue(this.requestRentalform.get("user").get("emailAddress").value);
    if (this.isUser) {
      this.requestRentalform.get("user").get("id").setValue(Number(localStorage.getItem("userId")));
      this.requestRentalform.get("user").get("isGuest").setValue(false);
      this.requestRentalform.get('user').get('setRandomPassword').setValue(false)
    } else {
      this.requestRentalform.get("user").get("id").setValue(null);
      this.requestRentalform.get("user").get("isGuest").setValue(true);
      this.requestRentalform.get('user').get('setRandomPassword').setValue(true)
    }
    this.requestRental = Object.assign({},this.requestRentalform.value,{images:this.requestRental.images},{fromDate:this.fromDate},{toDate:this.toDate});

    if (this.requestRentalform.valid && this.imageuploadValidation()) {
      this.requestRentalService.postRequestRental(this.requestRental).subscribe(res=>{
        let result = res.error;
        if(res.success){
          // debugger
          this.responseRequestData = {
            fromDate:res['result'].fromDate,
            qrCode:res['result'].qrCode,
            requestId:res['result'].id,
          };
          this.requestRentalService.setRequestResponseRentalData(this.responseRequestData);

          this.showRequestRentalconfirmation = true;
        }
      })
    } else {
      console.log("not valid");
    }
  }

  public getcheckboxFamilyValue(e) {
    this.familyOrSinglesValue = true;
    if (e === "family") {
      this.requestRentalform.controls["unitType"].setValue(2);
    } else {
      this.requestRentalform.controls["unitType"].setValue(1);
    }
    console.log(this.requestRentalform.controls["unitType"].value);
  }

  public imageuploadValidation() {
    if (
      this.uploadedFileList.length >= 4 &&
      this.uploadedFileList.length <= 20 &&
      this.totalsizeOfimages <= 100000000
      ) {
        this.validaImages = true
      return true;
    } else {
      Swal.fire('Images Required...', 'Check images validation', 'error');

      this.validaImages = false
      return false;
    }
  }

  private convertFiletypeToLower(fileExtension: string) {
    return fileExtension.toLocaleLowerCase();
  }

  public checkFiletype(fileExt: string) {
    if (fileExt === ".png" || fileExt === ".jpeg" || fileExt === ".jpg" || fileExt === ".jfif") {
      return true;
    } else {
      return false;
    }
  }

  public uploadImages(event: any) {
    for(let i=0;i<this.requestRental.images.length;i++){
      if(!this.requestRental.images[i].hasOwnProperty('path')){
        this.requestRental['images'].splice(i,1)
      }
    }
    this.loading = true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
  }
  // console.log(this.myFiles);
  let serviceArray = []
    for (let index = 0; index < this.myFiles.length; index++) {
      const formData: FormData = new FormData();
      const file = <File>event.target.files[index];
      this.totalsizeOfimages += file.size
      formData.append("file_" + index, file, file.name);
      formData.append("tenantId" , localStorage.getItem('tenantId'));
      serviceArray.push(this.requestRentalService.postFile(formData));
    }

    observableZip(...serviceArray).subscribe(res=>{
      this.loading = false;
      if(res.length>0){
        for(let i = 0; i<res.length;i++){
          // console.log(res[i]['body']['result']["filesNames"][0]['fileName']);
          let fileObj  = {}
              fileObj = {
            fileName: res[i]["body"]["result"]["filesNames"][0].fileName,
            fileType: this.convertFiletypeToLower(res[i]["body"]["result"]["filesNames"][0].fileType)
          };
          this.requestRental['images'].push({
          "path":res[i]["body"]["result"]["filesNames"][0].fileName,
          "type":res[i]["body"]["result"]["filesNames"][0].fileType,
          "id":0,
          "unitRequestId":null,
          });
          this.uploadedFileList.push(fileObj);
          // console.log(this.uploadedFileList)
        }
      }
    });
      this.myFiles = []
  }

   public closeRequestModal(e){
    this.showRequestRentalconfirmation = e;
    this.showPaymentModal = true;
  }

 public closePaymentModal(e) {
    this.showPaymentModal = e;
  }

}
