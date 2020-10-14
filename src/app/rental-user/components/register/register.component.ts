import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RentalUserService } from "../../services/rental-user.service";
import { Router } from "@angular/router";
import Swal  from 'sweetalert2/dist/sweetalert2.js';
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
           localStorage.setItem('userId',res['result']['id']);
           localStorage.setItem('accessToken','Bearer' + ' ' + res.result['accessToken']);
           localStorage.setItem('address', res['result'].address);
           localStorage.setItem('emailAddress', res['result'].emailAddress);
           localStorage.setItem('fullName', res['result'].fullName);
           localStorage.setItem('name', res['result'].name);
           localStorage.setItem('phoneNumber', res['result'].phoneNumber);
          this.router.navigate(["./rentals"]);
          }
        },(error) => {
          Swal.fire(
            "Error",
            `${error["error"]["error"]["message"]}`,
            "Error"
          );
        });
    } else {
      // console.log("not ok");
    }
  }
  public formControls(controls) {
    return this.userRegisterForm.controls[controls];
  }
}
