import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { FormBuilder } from "@angular/forms";
import { RentalUserService } from "../../services/rental-user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  public fieldTextType: boolean = false;
  public userLoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rentalUserService: RentalUserService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.userLoginForm = this.fb.group({
      userEmail: ["", Validators.required],
      userPassword: ["", Validators.required],
    });
  }

  onSubmit(form) {
    if (this.userLoginForm.valid) {
      this.rentalUserService
        .sendUserLoginData(this.userLoginForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      console.log("not valid");
    }
  }
}
