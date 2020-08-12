import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RentalUserService } from "../../services/rental-user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  public password: boolean = false;
  public confirmpassword: boolean = false;
  public userRegisterForm: FormGroup = new FormGroup({});
  public agree:boolean = false;

  constructor(
    private fb: FormBuilder,
    private rentalUserService: RentalUserService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.fb.group(
      {
        userEmail: ["", Validators.required],
        userPassword: ["", Validators.required],
        userConfirmPassword: ["", Validators.required],
        isAgree:["",Validators.required]
      },
      {
        validator: this.ConfirmedValidator(
          "userPassword",
          "userConfirmPassword"
        ),
      }
    );
  }
  public onSubmit(form: FormGroup) {
    console.log("agree", this.agree)
    if (this.userRegisterForm.valid) {
      this.rentalUserService
        .sendUserLoginData(this.userRegisterForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      console.log("not ok");
    }
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  public formControls(controls) {
    return this.userRegisterForm.controls[controls];
  }
}
