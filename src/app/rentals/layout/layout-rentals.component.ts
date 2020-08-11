import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template:`
  <router-outlet></router-outlet>
  <footer>footer</footer>
  `
})
export class RentalsLayoutComponent implements OnInit {

  constructor() {}

    ngOnInit() {}

}
