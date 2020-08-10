import { CommonModule } from "@angular/common";
import { HomeRentalComponent } from "./components/home/home.component";
import { Login } from "./components/login/login";
import { NgModule } from "@angular/core";
import { RentalUserRoutingModule } from "./rental-user-routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [HomeRentalComponent, Login],
  imports: [CommonModule, SharedModule, RentalUserRoutingModule],
  providers: [],
})
export class RentalUserModule {}
