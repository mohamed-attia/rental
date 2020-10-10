import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { LanguageUpdateService } from 'src/app/shared/providers/language/language.service';
import { RentalRequestsUserService } from "../services/rental-requests.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  public email: any;
  public phone: any;
  public closeResult = '';
  public userUpdateForm: FormGroup;
  showmodal = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private rentalRequestsUserService: RentalRequestsUserService,
    private languageUpdateService:LanguageUpdateService) {
    this.rentalRequestsUserService.setHeaderTitle("UserProfile.PersonalInfo");
    this.languageUpdateService.setMenuItem('user-profile');
  }

  ngOnInit() {
    this.getUserData();
    this.createForm();
  }

  private createForm() {
    this.userUpdateForm = this.fb.group({
      userName: ["", Validators.required],
      userEmail: ["", Validators.required],
      userPhone: ["", Validators.required],
      userAddress: ["", Validators.required],
    });
  }


  public onSubmit(form:FormGroup) {
    debugger
    if (this.userUpdateForm.valid) {
      console.log(this.userUpdateForm.value);
      this.showmodal = false;
    }else{
      console.log("not valid");
    }

  }
  getUserData() {
    this.email = localStorage.getItem('emailAddress');
    this.phone = localStorage.getItem("phoneNumber");
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
