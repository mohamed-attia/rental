import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from "../../service/rental.service";
import { RequestRentalModel } from '../../models/request-rental.model';
import { RequestRentalService } from 'src/app/rental-user/services/request-rental-service';

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
  public requestRental:RequestRentalModel = {};
  private totalNumberOfImages = 0;
  public fileToUpload: File = null;
  public totalsizeOfimages = 10000000;
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

  private getRentalData(){
    this.getRentalsListService.getRentalData().subscribe((res) => {
      this.requestdata = res;
      console.log('res', res)
    });
  }

  public monthMaping(month){
    switch(month){
      case 1:
        return 'Jan'
      case 2:
        return 'Feb'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'Jun'
      case 7:
        return 'Jul'
      case 8:
        return 'Aug'
      case 9:
        return 'Sept'
      case 10:
        return 'Oct'
      case 11:
        return 'Nov'
      case 12:
        return 'Dec'
    }
  }

  private createForm() {
    this.requestRentalform = this.fb.group({
      unitType :[''],
      amount :"",
      insurance :'',
      status :this.requestdata.status,
      note :'',
      paymentStatus:"",
      paymentNote :"",
      unitId :this.requestdata.unitId,
      fromDate :`${this.requestdata.fromDate.year}-${this.requestdata.fromDate.month}-${this.requestdata.fromDate.day}`,
      toDate :`${this.requestdata.toDate.year}-${this.requestdata.toDate.month}-${this.requestdata.toDate.day}`,
      user:this.fb.group({
        fullName:["", Validators.required],
        id :"",
        userName:"",
        emailAddress:["", Validators.required],
        phoneNumber:["", Validators.required],
        password :"",
        tenantId: +localStorage.getItem('tenantId'),
        acceptTermsAndConditions:"",
        address:["", Validators.required],
        setRandomPassword:"",
        shouldChangePasswordOnNextLogin:"",
        isGuest:""
      })
    });
  }

  public onSubmit(form: FormGroup) {
    this.requestRentalform.get('user').get('userName').setValue(this.requestRentalform.get('user').get('emailAddress').value)
    if(this.isUser){
      this.requestRentalform.get('user').get('id').setValue(Number(localStorage.getItem('userId')));
      this.requestRentalform.get('user').get('isGuest').setValue(false)
    }else {
      this.requestRentalform.get('user').get('id').setValue(0);
      this.requestRentalform.get('user').get('isGuest').setValue(true)
    }
    console.log('form', this.requestRentalform.value)
    // if(this.requestRentalform.controls['family'].value) {
    // }
    // if (this.requestRentalform.valid && this.totalNumberOfImages >= 4 && this.totalsizeOfimages <= 10000000) {
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
    console.log(this.requestRentalform.controls['unitType'].value);
  }

  public attachFiles(files: FileList){
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
    // this.requestRentalService.sendAttachment({}).subscribe(res=>{
    //   console.log(res)
    // })
  }
}
