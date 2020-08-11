import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RentalsComponent } from "./components/rentals/rentals.component";
import { RentalsLayoutComponent } from "./layout/layout-rentals.component";

export const routes: Routes = [
  {
    path: "rentals",
    component: RentalsLayoutComponent,
    children: [
      {
        path: "",
        children: [{ path: "", component: RentalsComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalsRoutings{}
