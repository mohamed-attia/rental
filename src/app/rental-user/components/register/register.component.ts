import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { FormBuilder } from "@angular/forms";
import { RentalUserService } from "../../services/rental-user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  public password: boolean = false;
  public confirmpassword: boolean = false;
  public userRegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentalUserService: RentalUserService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.fb.group({
      userEmail: ["", Validators.required],
      userPassword: ["", Validators.required],
      userConfirmPassword: ["", Validators.required],
    });
  }
  onSubmit(form) {
    this.rentalUserService
      .sendUserLoginData(this.userRegisterForm.value)
      .subscribe((res) => {
        console.log(res);
      });
    console.log(this.userRegisterForm.value);
  }
}
