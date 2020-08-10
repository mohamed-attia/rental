import { RouterModule, Routes } from "@angular/router";

import { HomeRentalComponent } from "./components/home/home.component";
import { Login } from "./components/login/login";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "user",
    component: HomeRentalComponent,
    children: [
      {
        path: "login",
        component: Login
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalUserRoutingModule {}
