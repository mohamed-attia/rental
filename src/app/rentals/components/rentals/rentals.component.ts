import * as moment from "moment";

import { Component, OnInit } from "@angular/core";

import { GetRentalsListService } from "../../service/rental.service";
import { RentalModel } from "../../models/rentals.model";
import { RentalUserService } from "src/app/rental-user/services/rental-user.service";
import { RequestRentalService } from "../../service/request-rental-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-rentals",
  templateUrl: "./rentals.component.html",
})
export class RentalsComponent implements OnInit {
  public rentalsList: Array<RentalModel> = [];
  public rentalIMages: [] = [];
  public sortedPricesList = [];
  public currentPriceList = [];

  constructor(
    private getRentalsListService: GetRentalsListService,
    private router: Router,
    private requestRentalService: RequestRentalService,
    private rentalUserService: RentalUserService
  ) {}

  ngOnInit() {
    this.getRentals();
    this.getRentalImages();
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: "",
    prevArrow: "",
    dots: true,
    infinite: true,
    autoplay: true,
  };

  private getRentals() {
    this.getRentalsListService.getRentasList().subscribe((rentals) => {
      this.rentalsList = rentals["body"]["result"]["items"];
      this.getSortedPriceList(rentals["body"]["result"]["items"]);
    });
  }

  private getRentalImages() {
    this.rentalUserService.getTenantImages().subscribe((images) => {
      this.rentalIMages = images;
    });
  }

  public goRetalDetails(i, id: number) {
    this.requestRentalService.setrentalImages({
      images: this.rentalsList[i]["unit"]["images"],
      videos: this.rentalsList[i]["unit"]["videos"],
    });
    this.router.navigate(["/rentals", id]);
  }

  private getSortedPriceList(priceList) {
    if (priceList.length > 0) {
      for (let i = 0; i < priceList.length; i++) {
        this.sortedPricesList = priceList[i]["unit"]["prices"];
        this.sortedPricesList.sort(function (a, b) {
          return a.priceOrder - b.priceOrder;
        });
        this.getCurrentPrice(this.sortedPricesList);
        // console.log(i + '>>' , this.sortedPricesList)
      }
    }
  }

  public getCurrentPrice(sortedPrice) {
    let currentTime = moment(new Date());
     let sorted = sortedPrice.find(x => moment(currentTime).isBetween(x['fromDate'], x['toDate']));
    this.currentPriceList.push(sorted);
  }

}
