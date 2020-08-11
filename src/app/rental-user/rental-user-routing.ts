import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalUserRoutingModule {}
