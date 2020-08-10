import { CommonModule } from "@angular/common";
import { HomeRentalComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { RentalUserRoutingModule } from "./rental-user-routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [HomeRentalComponent, LoginComponent],
  imports: [CommonModule, SharedModule, RentalUserRoutingModule],
  providers: [],
})
export class RentalUserModule {}
