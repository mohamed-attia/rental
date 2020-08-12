import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rentals",
  templateUrl:'./rentals.component.html'
})
export class RentalsComponent implements OnInit {

  constructor() {}

    ngOnInit() {}

    slides = [342, 453, 846];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "",
    "prevArrow": "",
    "dots": true,
    "infinite": true
  };

}
