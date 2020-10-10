import { Component, OnInit } from "@angular/core";

import { LanguageUpdateService } from 'src/app/shared/providers/language/language.service';
import { RentalRequestsUserService } from "../services/rental-requests.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  email: any;
  phone: any;

  constructor(private rentalRequestsUserService: RentalRequestsUserService, private languageUpdateService:LanguageUpdateService) {
    this.rentalRequestsUserService.setHeaderTitle("UserProfile.PersonalInfo");
    this.languageUpdateService.setMenuItem('user-profile');
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.email = localStorage.getItem('emailAddress');
    this.phone = localStorage.getItem("phoneNumber");
  }
}
