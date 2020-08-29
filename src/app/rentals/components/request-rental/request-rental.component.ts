import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from "../../service/rental.service";
import { RequestRentalModel } from '../../models/request-rental.model';
import { RequestRentalService } from 'src/app/rentals/service/request-rental-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: "app-root",
  templateUrl: "./request-rental.component.html",
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
  // public showNoticePayment = false;
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
    this.createForm();
  }

  private getRentalData() {
    this.getRentalsListService.getRentalData().subscribe((res) => {
      this.requestdata = res;
      console.log("res", res);
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
      amount: this.requestdata.amount,
      insurance: this.requestdata.insurance,
      status: this.requestdata.status,
      note: "",
      paymentStatus: "",
      paymentNote: "",
      unitId: this.requestdata.unitId,
      fromDate: new Date(`${this.requestdata.fromDate.year}-${this.requestdata.fromDate.month}-${this.requestdata.fromDate.day}`).toISOString(),
      toDate: new Date(`${this.requestdata.toDate.year}-${this.requestdata.toDate.month}-${this.requestdata.toDate.day}`).toISOString(),
      user: this.fb.group({
        fullName: ["", Validators.required],
        id: "",
        userName: "",
        emailAddress: ["", Validators.required],
        phoneNumber: ["", Validators.required],
        password: "",
        tenantId: +localStorage.getItem("tenantId"),
        acceptTermsAndConditions: "",
        address: ["", Validators.required],
        setRandomPassword: "",
        shouldChangePasswordOnNextLogin: "",
        isGuest: "",
      }),
    });
  }

  public onSubmit(form: FormGroup) {
    this.requestRentalform
      .get("user")
      .get("userName")
      .setValue(this.requestRentalform.get("user").get("emailAddress").value);
    if (this.isUser) {
      this.requestRentalform
        .get("user")
        .get("id")
        .setValue(Number(localStorage.getItem("userId")));
      this.requestRentalform.get("user").get("isGuest").setValue(false);
    } else {
      this.requestRentalform.get("user").get("id").setValue(0);
      this.requestRentalform.get("user").get("isGuest").setValue(true);
    }
    this.requestRental = Object.assign({},this.requestRentalform.value,{images:this.requestRental.images});
    console.log("this.requestRental", this.requestRental);

    this.showRequestRentalconfirmation = true;
    this.requestRentalService.postRequestRental(this.requestRental).subscribe(res=>{
      debugger
      console.log(res);
      console.log(res['result'].success);
      console.log('send data')
      if(res['result'].success){
      }
    })
    // if(this.requestRentalform.controls['family'].value) {
    // }
    // if (this.requestRentalform.valid && this.imageuploadValidation() ) {
    //   console.log('data', this.requestRentalform.value)
    // } else {
    //   console.log("not valid");
    // }
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
  private imageuploadValidation() {
    if (
      this.uploadedFileList.length > 4 &&
      this.uploadedFileList.length < 20 &&
      this.totalsizeOfimages <= 10000000
    ) {
      return true;
    } else {
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
    const formData: FormData = new FormData();
    for (let index = 0; index < event.target.files.length; index++) {
      const file = <File>event.target.files[index];
      this.totalsizeOfimages += file.size
      formData.append("file_" + index, file, file.name);
    }
    if (formData) {
      this.requestRentalService.postFile(formData).subscribe((res: any) => {
        this.requestRental['images'].push({
          "path":res["body"]["result"]["filesNames"][0].fileName,
          "type":res["body"]["result"]["filesNames"][0].fileType,
          "id":null,
          "unitRequestId":null,
        })
        let fileObj = {
          fileName: res["body"]["result"]["filesNames"][0].fileName,
          fileType: this.convertFiletypeToLower(
            res["body"]["result"]["filesNames"][0].fileType
          ),
        };
        this.uploadedFileList.push(fileObj);
        this.loading = false;
        console.log('images',this.requestRental.images)
      });
    }else {
      this.loading = false;
    }
  }

   public closeRequestModal(e){
    this.showRequestRentalconfirmation = e;
    this.showPaymentModal = true;
  }

 public closePaymentModal(e) {
    this.showPaymentModal = e;
  }

  // simpleAlert(){
  //   Swal.fire('Hello world!');
  // }

  // alertWithSuccess(){
  //   Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  // }

  // confirmBox(){
  //   Swal.fire({
  //     title: 'Are you sure want to remove?',
  //     text: 'You will not be able to recover this file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your imaginary file has been deleted.',
  //         'success'
  //       )
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Your imaginary file is safe :)',
  //         'error'
  //       )
  //     }
  //   })
  // }
}
