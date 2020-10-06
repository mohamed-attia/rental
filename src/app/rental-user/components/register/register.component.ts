import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RentalUserService } from "../../services/rental-user.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserLoginModel } from './../../models/user-login.model';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  public password: boolean = false;
  public confirmpassword: boolean = false;
  public userRegisterForm: FormGroup = new FormGroup({});
  public agree: boolean = false;
  private userLogin:UserLoginModel;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rentalUserService: RentalUserService
  ) {}

  ngOnInit() {

    this.userRegisterForm = this.fb.group({
      userName: ["", Validators.required],
      emailAddress: [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      address: ["", Validators.required],
      phoneNumber: [null, Validators.compose([Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)])],
      password: ["", Validators.required],
      userConfirmPassword: ["", Validators.required],
      tenantId: localStorage.getItem("tenantId"),
      acceptTermsAndConditions: ["", Validators.required],
    });
  }

  public onSubmit(form: FormGroup) {
    if (
      this.userRegisterForm.valid &&
      this.userRegisterForm.get("password").value ===
        this.userRegisterForm.get("userConfirmPassword").value
    ) {
      this.userRegisterForm.removeControl("userConfirmPassword");
      this.rentalUserService
        .sendUserRegisterData(this.userRegisterForm.value)
        .subscribe((res) => {
          if (res["success"]) {
            this.userLogin = {userNameOrEmailAddressOrPhone:this.userRegisterForm.get('userName').value,password:this.userRegisterForm.get('password').value}
            this.rentalUserService.sendUserLoginData(this.userLogin).subscribe(res=>{
           localStorage.setItem('userId',res['result']['userId']);
           localStorage.setItem('accessToken','Bearer' + ' ' + res.result['accessToken']);

           localStorage.setItem('address', res['result'].address);
           localStorage.setItem('emailAddress', res['result'].emailAddress);
           localStorage.setItem('name', res['result'].name);
           localStorage.setItem('phoneNumber', res['result'].phoneNumber);

            this.router.navigate(["./rentals"]);
            });
          }
        });
    } else {
      console.log("not ok");
      // Swal.fire('Rquired', 'Check images validation', 'error');
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
