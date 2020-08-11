import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { RentalsComponent } from "./components/rentals/rentals.component";
import { RentalsLayoutComponent } from "./components/layout/layout-rentals.component";
import { UserLayoutComponent } from "./components/layout/layout-user.component";

export const routes: Routes = [
  {
    path: "user",
    component: UserLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
  {
    path: "rentals",
    component: RentalsLayoutComponent,
    children: [{ path: "", component: RentalsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalUserRoutingModule {}
