import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { RentalUserRoutingModule } from "./rental-user-routing";
import {RentalsComponent} from './components/rentals/rentals.component'
import { RentalsLayoutComponent } from "./components/layout/layout-rentals.component";
import { SharedModule } from "../shared/shared.module";
import { UserLayoutComponent } from "./components/layout/layout-user.component";

@NgModule({
  declarations: [UserLayoutComponent, LoginComponent,RegisterComponent,RentalsComponent,RentalsLayoutComponent ],
  imports: [CommonModule, SharedModule, RentalUserRoutingModule],
  providers: [],
})
export class RentalUserModule {}
