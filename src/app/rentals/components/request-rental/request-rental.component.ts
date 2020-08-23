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
      userNameOrEmailAddressOrPhone: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public onSubmit(form:FormGroup) {
    if (this.requestRentalform.valid) {
      console.log('data', this.requestRentalform.value)
    } else {
      console.log("not valid");
    }
  }
}
