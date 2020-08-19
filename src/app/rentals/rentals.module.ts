import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import {RentalsComponent} from './components/rentals/rentals.component'
import { RentalsLayoutComponent } from "./layout/layout-rentals.component";
import { RentalsRoutings } from "./rentals-routing";
import { SharedModule } from "../shared/shared.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [RentalsComponent,RentalsLayoutComponent,RentalDetailsComponent],
  imports: [CommonModule, SharedModule, RentalsRoutings,SlickCarouselModule,FormsModule],
  providers: [],
})
export class RentalsModule {}
