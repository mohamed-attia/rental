import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRangePopup } from './datepicker-range-popup';

@NgModule({
  imports: [BrowserModule, NgbModule, FormsModule],
  declarations: [NgbdDatepickerRangePopup],
  exports: [NgbdDatepickerRangePopup],
})
export class NgbdDatepickerRangePopupModule {}
