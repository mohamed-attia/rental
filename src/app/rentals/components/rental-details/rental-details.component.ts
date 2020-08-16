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
  public imagesList = [];
  public videoList = [];
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
        this.rentalDetails = rentalDetails['body']['result']['unit'];
        if(this.rentalDetails['images'].length > 0) {
         for(let i = 0; i < this.rentalDetails['images'].length ; i++){
          this.imagesList.push(this.rentalDetails['images'][i]);
          this.videoList.push(this.rentalDetails['videos'][i]);
         }
         console.log(this.imagesList)
        }
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
