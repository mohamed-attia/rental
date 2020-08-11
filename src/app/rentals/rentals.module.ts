import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {RentalsComponent} from './components/rentals/rentals.component'
import { RentalsLayoutComponent } from "./layout/layout-rentals.component";
import { RentalsRoutings } from "./rentals-routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [RentalsComponent,RentalsLayoutComponent],
  imports: [CommonModule, SharedModule, RentalsRoutings],
  providers: [],
})
export class RentalsModule {}
