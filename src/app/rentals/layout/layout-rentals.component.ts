import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template:`
  <div class="content-wrapper">
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-menu>menu</app-menu>
  </div>
  `
})
export class RentalsLayoutComponent implements OnInit {

  constructor() {}

    ngOnInit() {}

}
