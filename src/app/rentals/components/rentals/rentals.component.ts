import { Component, OnInit } from "@angular/core";

import { GetRentalsListService } from '../../service/rental.service';
import { RentalDtailsModel } from '../../models/rentals.model';

@Component({
  selector: "app-rentals",
  templateUrl:'./rentals.component.html'
})
export class RentalsComponent implements OnInit {
  public rentalsList:Array<RentalDtailsModel> = [];

  constructor(private getRentalsListService:GetRentalsListService) {}

    ngOnInit() {
      this.getRentals();
    }

  slides = [342, 453, 846];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "",
    "prevArrow": "",
    "dots": true,
    "infinite": true
  };

  private getRentals() {
    this.getRentalsListService.getRentasList().subscribe(rentals=>{
        this.rentalsList = rentals
    })
  }

}
