import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

import { FormBuilder } from "@angular/forms";
import { RentalUserService } from '../../services/rental-user.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  public fieldTextType: boolean = false;
  public userLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private rentalUserService: RentalUserService) {}
  // constructor(private fb: FormBuilder, private sendUserLoginData) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      userEmail: ['', Validators.required],
      userPassword: ['',Validators.required],
    });
  }

  onSubmit(form) {
    this.rentalUserService.sendUserLoginData(this.userLoginForm.value).subscribe(res=>{
      console.log(res)
    })
    console.log(this.userLoginForm.value);
  }
}
