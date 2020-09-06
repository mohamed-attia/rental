import { Component, OnInit } from "@angular/core";

import { GetRentalsListService } from '../../service/rental.service';
import { RentalModel } from '../../models/rentals.model';
import { RequestRentalService } from '../../service/request-rental-service';
import { Router } from '@angular/router';

@Component({
  selector: "app-rentals",
  templateUrl:'./rentals.component.html'
})
export class RentalsComponent implements OnInit {
  public rentalsList:Array<RentalModel> = [];

  constructor(private getRentalsListService:GetRentalsListService, private router:Router, private requestRentalService:RequestRentalService) {}

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

  public goRetalDetails (i,id:number) {
    // debugger
    console.log(this.rentalsList[i]['unit']['images'])
    this.requestRentalService.setrentalImages({images:this.rentalsList[i]['unit']['images'],videos:this.rentalsList[i]['unit']['videos']})
    this.router.navigate(['/rentals', id]);
  }

}
