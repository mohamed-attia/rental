import { CommericialRegSystemComponent } from "./components/commericial-reg-system/commericial-reg-system.component";
import { CommonModule } from "@angular/common";
import { HomeMciComponent } from "./components/home/home.component";
import {Login} from './components/login/login'
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { routes } from "./rental-user-routing";

@NgModule({
  declarations: [
    HomeMciComponent,
    CommericialRegSystemComponent,
    Login
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: []
})
export class MciModule {}
