import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { LanguageUpdateService } from "../../providers/language/language.service";
import {Location} from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: "app-request-rental-header",
  templateUrl: "./request-rental-header.component.html",
})
export class RequestRentalHeaderComponent implements OnInit {
  public title: string;
  constructor(
    private _location: Location,
    private language: LanguageUpdateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.language.getCurrentLang().subscribe((lang) => {
      if (lang === "ar") {
        this.title = "الرمز التجاري";
      } else {
        this.title = "QR Code Information";
      }
    });
  }

  backClicked() {
    this._location.back();
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(["./user/login"]);
  }
}
