import { CommericialRegSystemComponent } from "./components/commericial-reg-system/commericial-reg-system.component";
import { HomeMciComponent } from "./components/home/home.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "rental",
    component: HomeMciComponent,
    children: [
      {
        path: "home",
        component: CommericialRegSystemComponent
      }
    ]
    }
];
