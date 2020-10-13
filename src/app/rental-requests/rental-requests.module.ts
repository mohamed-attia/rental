import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { PaymentComponent } from './payment/payment.component';
import { RentalRequestsComponent } from "./rental-requests/rental-requests.component";
import { RentalRequestsRoutingModule } from "./rental-requests-routing";
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { RequestsLayoutComponent } from "./requests-layout/requests-layout.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./../shared/shared.module";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [PaymentComponent,RequestsLayoutComponent, RentalRequestsComponent,UserProfileComponent, ReportIssueComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule,
    CommonModule,
    RentalRequestsRoutingModule,
  ],
})
export class RentalRequestsModule {}
