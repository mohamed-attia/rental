import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RentalUserService } from "../../services/rental-user.service";
import { Router } from '@angular/router';

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
    private router:Router,
    private fb: FormBuilder,
    private rentalUserService: RentalUserService
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.fb.group(
      {
        userName: ["", Validators.required],
        emailAddress:["", Validators.required],
        phoneNumber:["", Validators.required],
        password: ["", Validators.required],
        userConfirmPassword: ["", Validators.required],
        tenantId:Number(localStorage.getItem('tenantId')),
        acceptTermsAndConditions:["",Validators.required]
      }
    );
  }
  public onSubmit(form: FormGroup) {
    if (this.userRegisterForm.valid && (this.userRegisterForm.get('password').value === this.userRegisterForm.get('userConfirmPassword').value)) {
      this.userRegisterForm.removeControl('userConfirmPassword');
      this.rentalUserService
        .sendUserREgisterData(this.userRegisterForm.value)
        .subscribe((res) => {
         this.router.navigate(['./user/login'])
        });
    } else {
      console.log("not ok");
    }
  }

  // private ConfirmedValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];
  //     if (
  //       matchingControl.errors &&
  //       !matchingControl.errors.confirmedValidator
  //     ) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmedValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }
  public formControls(controls) {
    return this.userRegisterForm.controls[controls];
  }
}
