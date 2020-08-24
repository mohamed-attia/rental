import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { GetRentalsListService } from "../../service/rental.service";

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

  constructor(
    private getRentalsListService: GetRentalsListService,
    private fb: FormBuilder
  ) {
    if (localStorage.getItem("accessToken")) {
      this.isUser = true;
    }
  }

  ngOnInit() {
    this.getRentalsListService.getRentalData().subscribe((res) => {
      this.requestdata = res;
    });

    this.createForm();
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
      fullName: ["", Validators.required],
      telephone: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", Validators.required],
      family: [""],
      singles: [""],
      insurrence: ["", Validators.required],
      rentamount: ["", Validators.required],
    });
  }

  public onSubmit(form: FormGroup) {
    // if(this.requestRentalform.controls['family'].value) {
    // }
    // if (this.requestRentalform.valid) {
    //   console.log('data', this.requestRentalform.value)
    // } else {
    //   console.log("not valid");
    // }
  }

  public getcheckboxFamilyValue(e) {
    this.familyOrSinglesValue = true;
    if (e === "family") {
      this.requestRentalform.controls["family"].setValue(true);
      this.requestRentalform.controls["singles"].setValue(false);
    } else {
      this.requestRentalform.controls["family"].setValue(false);
      this.requestRentalform.controls["singles"].setValue(true);
    }
  }
}
