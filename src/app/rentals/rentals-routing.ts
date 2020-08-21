import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RentalDetailsComponent } from "./components/rental-details/rental-details.component";
import { RentalsComponent } from "./components/rentals/rentals.component";
import { RentalsLayoutComponent } from "./layout/layout-rentals.component";
import { RequestRentalComponent } from './components/request-rental/request-rental.component';

export const routes: Routes = [
  {
    path: "rentals",
    component: RentalsLayoutComponent,
        children: [
          { path: "", component: RentalsComponent },
          { path: ":id", component: RentalDetailsComponent },
          { path: ":id/request-rental", component: RequestRentalComponent },
        ],
      },
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalsRoutings {}
