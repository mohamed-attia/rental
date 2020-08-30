import { Component, OnInit } from "@angular/core";

import { GetRentalsListService } from '../../service/rental.service';
import { RentalModel } from '../../models/rentals.model';
import { Router } from '@angular/router';

@Component({
  selector: "app-rentals",
  templateUrl:'./rentals.component.html'
})
export class RentalsComponent implements OnInit {
  public rentalsList:Array<RentalModel> = [];

  constructor(private getRentalsListService:GetRentalsListService, private router:Router) {}

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
    "infinite": true,
    "autoplay":true,
  };

  private getRentals() {
    this.getRentalsListService.getRentasList().subscribe(rentals=>{
        this.rentalsList = rentals['body']['result']['items']
        console.log(rentals['body']['result']['items'][0])
        console.log(typeof this.rentalsList)
        console.log(typeof rentals['body']['result']['items'][0])
    })
  }

  public goRetalDetails (id:number) {
    this.router.navigate(['/rentals', id]);
  }

}
