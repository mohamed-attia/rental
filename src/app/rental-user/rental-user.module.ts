import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { RentalUserRoutingModule } from "./rental-user-routing";
import { SharedModule } from "../shared/shared.module";
import { UserLayoutComponent } from "./components/layout/layout-user.component";

@NgModule({
  declarations: [UserLayoutComponent, LoginComponent,RegisterComponent ],
  imports: [CommonModule, SharedModule, RentalUserRoutingModule],
  providers: [],
})
export class RentalUserModule {}
