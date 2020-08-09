import { CommericialRegSystemComponent } from "./components/commericial-reg-system/commericial-reg-system.component";
import { HomeMciComponent } from "./components/home/home.component";
import { Login } from "./components/login/login";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "rental",
    component: HomeMciComponent,
    children: [
      {
        path: "home",
        component: CommericialRegSystemComponent
      },
      {
        path: "login",
        component: Login
      }
    ]
    }
];
