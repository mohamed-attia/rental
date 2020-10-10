import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

export const routes: Routes = [
  { path: "", redirectTo: "rentals", pathMatch: "full" },
  {
    path: "user",
    loadChildren: () =>
      import("./rental-user/rental-user.module").then(
        (mod) => mod.RentalUserModule
      ),
  },
  {
    path: "rentals",
    loadChildren: () =>
      import("./rentals/rentals.module").then((mod) => mod.RentalsModule),
  },
  {
    path: "rental-requests",
    loadChildren: () =>
      import("./rental-requests/rental-requests.module").then(
        (mod) => mod.RentalRequestsModule
      ),
  },
  {path:"user-profile",component:NotFoundComponent},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
