import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentNoticePopupComponent } from './components/payment-notice-popup/payment-notice.popup.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import {RentalsComponent} from './components/rentals/rentals.component'
import { RentalsLayoutComponent } from "./layout/layout-rentals.component";
import { RentalsRoutings } from "./rentals-routing";
import { ReqRentConfirmPopupComponent } from './components/request-confirmation-popup/request-confirmation-popup';
import { RequestRentalComponent } from './components/request-rental/request-rental.component';
import { SharedModule } from "../shared/shared.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [PaymentNoticePopupComponent,PaymentComponent,RentalsComponent,RentalsLayoutComponent,RentalDetailsComponent,RequestRentalComponent,ReqRentConfirmPopupComponent],
  imports: [NgxDropzoneModule, CommonModule, SharedModule, RentalsRoutings,SlickCarouselModule,FormsModule],
  providers: [],
})
export class RentalsModule {}
