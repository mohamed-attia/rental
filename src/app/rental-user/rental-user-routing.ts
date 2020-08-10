import { RouterModule, Routes } from "@angular/router";

import { HomeRentalComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import {RegisterComponent} from './components/register/register.component'

export const routes: Routes = [
  {
    path: "user",
    component: HomeRentalComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalUserRoutingModule {}
