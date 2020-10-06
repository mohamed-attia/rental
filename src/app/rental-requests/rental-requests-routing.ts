import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RentalRequestsComponent } from "./rental-requests/rental-requests.component";
import { RequestRentalComponent } from "./../rentals/components/request-rental/request-rental.component";
import { RequestsLayoutComponent } from "./requests-layout/requests-layout.component";

const routes: Routes = [
  {
    path: "rental-requests",
    component: RequestsLayoutComponent,
    children: [{ path: "", component: RentalRequestsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRequestsRoutingModule {}
