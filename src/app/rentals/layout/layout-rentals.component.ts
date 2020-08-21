import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  template:`
  <div class="content-wrapper">
    <!-- <app-header *ngIf="rentalHeader"></app-header> -->
    <app-request-rental-header></app-request-rental-header>
    <router-outlet></router-outlet>
    <app-menu>menu</app-menu>
  </div>
  `
})
export class RentalsLayoutComponent implements OnInit {

  constructor(private location: Location,private route: Router, private actRoute:ActivatedRoute) {
    route.events.subscribe(val => {
      console.log(actRoute.snapshot.children[0])
    });
  }

    ngOnInit() {}

}
