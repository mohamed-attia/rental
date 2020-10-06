import { Component, Input, OnInit } from "@angular/core";

import {Location} from '@angular/common';

@Component({
  selector: "app-request-rental-header",
  templateUrl: "./request-rental-header.component.html",
})
export class RequestRentalHeaderComponent implements OnInit {
  @Input()title: string;
  constructor(
    private _location: Location){}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }
}
