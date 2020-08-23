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
  public singlesValue = false;
  public familyValue = false;
  constructor(
    private getRentalsListService: GetRentalsListService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (localStorage.getItem("accessToken")) {
      this.isUser = true;
    }

    this.getRentalsListService.getRentalData().subscribe((res) => {
      this.requestdata = res;
    });

    this.createForm();
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
    console.log(e);
    if (e === "family") {
      this.requestRentalform.controls["family"].setValue(true);
      this.requestRentalform.controls["singles"].setValue(false);
    } else {
      this.requestRentalform.controls["family"].setValue(false);
      this.requestRentalform.controls["singles"].setValue(true);
    }
  }
}
