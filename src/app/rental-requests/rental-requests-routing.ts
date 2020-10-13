import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { RentalRequestsComponent } from "./rental-requests/rental-requests.component";
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { RequestsLayoutComponent } from "./requests-layout/requests-layout.component";
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "rental-requests",
    component: RequestsLayoutComponent,
    children: [
      { path: "", component: RentalRequestsComponent },
      {path:"user-profile",component:UserProfileComponent},
      {path:"report-issue",component:ReportIssueComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRequestsRoutingModule {}
