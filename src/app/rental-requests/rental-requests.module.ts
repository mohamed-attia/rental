import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RentalRequestsComponent } from "./rental-requests/rental-requests.component";
import { RentalRequestsRoutingModule } from "./rental-requests-routing";
import { RequestsLayoutComponent } from "./requests-layout/requests-layout.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./../shared/shared.module";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [RequestsLayoutComponent, RentalRequestsComponent,UserProfileComponent],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    RentalRequestsRoutingModule,
  ],
})
export class RentalRequestsModule {}
