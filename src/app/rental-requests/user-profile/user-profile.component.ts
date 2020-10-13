import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { LanguageUpdateService } from "src/app/shared/providers/language/language.service";
import { RentalRequestsUserService } from "../services/rental-requests.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  public email: any;
  public phone: any;
  public closeResult = "";
  public userUpdateForm: FormGroup;
  showmodal = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private rentalRequestsUserService: RentalRequestsUserService,
    private languageUpdateService: LanguageUpdateService
  ) {
    this.rentalRequestsUserService.setHeaderTitle("UserProfile.PersonalInfo");
    this.languageUpdateService.setMenuItem("user-profile");
  }

  ngOnInit() {
    this.getUserData();
    this.createForm();
  }

  private createForm() {
    this.userUpdateForm = this.fb.group({
      surname: ["", Validators.required],
      password: ["", Validators.required],
      emailAddress: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      id: [Number(localStorage.getItem("userId"))],
    });
  }

  public onSubmit(form: FormGroup) {

    if (this.userUpdateForm.valid) {
      let userData = Object.assign(
        { Name: this.userUpdateForm.get("surname").value },
        { UserName: this.userUpdateForm.get("surname").value },
        this.userUpdateForm.value
        );
        this.rentalRequestsUserService
        .sendUserProfileDate({ user: userData })
        .subscribe(
          (res) => {
            if (res['success'] === true) {
              localStorage.setItem("emailAddress", this.userUpdateForm.get('emailAddress').value);
              localStorage.setItem("name", this.userUpdateForm.get('surname').value);
              localStorage.setItem("phoneNumber", this.userUpdateForm.get('phoneNumber').value);
              this.modalService.dismissAll("save click");
              this.getUserData();
              this.userUpdateForm.reset();
            } else {
              return;
            }
          },
          (error) => {
            Swal.fire(
              "Error",
              `${error["error"]["error"]["message"]}`,
              "Error"
            );
          }
        );
    } else {
      console.log("not valid");
    }
  }

  getUserData() {
    this.email = localStorage.getItem("emailAddress");
    this.phone = localStorage.getItem("phoneNumber");
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.userUpdateForm.reset();
    this.modalService.dismissAll("save click");
  }
}
