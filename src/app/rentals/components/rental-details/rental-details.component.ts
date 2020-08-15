import { ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { GetRentalsListService } from "../../service/rental.service";
import { RentalModel } from "../../models/rentals.model";

@Component({
  selector: "app-rental-details",
  templateUrl: "./rental-details.component.html",
})
export class RentalDetailsComponent implements OnInit {
  public rentalDetails: RentalModel["unit"];
  private id: number;
  public showRentalVideos:boolean = false;
  public showRentalImages:boolean = true;
  constructor(
    private getRentalsListService: GetRentalsListService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getRentalId();
  }

  public getRentalId() {
    this.actRoute.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.getRentalDetails();
      console.log(this.id);
    });
  }

  public getRentalDetails() {
    this.getRentalsListService
      .getRentaDetailsById(this.id)
      .subscribe((rentalDetails) => {
        this.rentalDetails = rentalDetails['body']['result']['unit']
        console.log(rentalDetails['body']['result']['unit'])
      });
  }
  public OnShowRentalImages() {
    this.showRentalImages = true;
    this.showRentalVideos = false;
  }

  public OnShowRentalVideos() {
    this.showRentalImages = false;
    this.showRentalVideos = true;
  }
}
