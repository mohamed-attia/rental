import * as moment from 'moment';

import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

import { GetRentalsListService } from "../../service/rental.service";
import { RentalModel } from "../../models/rentals.model";
import { RequestRentalService } from '../../service/request-rental-service';

@Component({
  selector: "app-rental-details",
  templateUrl: "./rental-details.component.html",
})
export class RentalDetailsComponent implements OnInit {
  public showMoreUtilities = false;
  public allDescription = false;
  public rentalDetails: RentalModel["unit"];
  private id: number;
  public showRentalVideos: boolean = false;
  public showRentalImages: boolean = true;
  public imagesList = [];
  public videoList = [];
  public showRentalDetailsSlider: boolean = false;
  public hoveredDate: NgbDateStruct | null = null;
  public fromDate: NgbDateStruct | null;
  public toDate: NgbDateStruct | null;
  public sortedPricesList = [];
  public totalAmount = 0;
  public max=4;
  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    nextArrow: "",
    prevArrow: "",
    dots: true,
    infinite: true,
  };
  // images: [] = [];
  videos: [] = [];
  constructor(
    private getRentalsListService: GetRentalsListService,
    private actRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router:Router,
    private requestRentalService: RequestRentalService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    this.getRentalId();

  }

  ngOnInit() {
    this.requestRentalService.getRentalImages().subscribe(res=>{
      // this.images = res['images'];
      this.videos = res['videos'];
    })
  }

  public getRentalId() {
    this.actRoute.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.getRentalDetails();
    });
  }

  public getRentalDetails() {
    this.getRentalsListService
      .getRentaDetailsById(this.id)
      .subscribe((rentalDetails) => {
        this.rentalDetails = rentalDetails["body"]["result"]["unit"];
        this.imagesList = rentalDetails["body"]["result"]["unit"]["images"];
        for(let i =0 ; i < this.rentalDetails["videos"].length; i ++){
          this.videoList.push(this.rentalDetails["videos"][i]);
        }
        this.getSortedPriceList(this.rentalDetails['prices'])
        // if (rentalDetails["body"]["result"]["unit"]["images"].length > 0) {
          // for (let i = 0; i < this.rentalDetails["images"].length; i++) {
          // }
        // }
      });
  }

  public getSortedPriceList(priceList): void{
    if(priceList.length> 0) {
      this.sortedPricesList = priceList;
      this.sortedPricesList.sort(function(a, b) {
        return a.priceOrder - b.priceOrder ;
      });
      this.checkDateRange();
    }
  }

  public OnShowRentalImages() {
    this.showRentalImages = true;
    this.showRentalVideos = false;
  }

  public OnShowRentalVideos() {
    this.showRentalImages = false;
    this.showRentalVideos = true;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    // console.log('fromDate',this.fromDate)
    // console.log('toDate',this.toDate)
    this.checkDateRange();
  }

  public checkDateRange(): void{
    if(this.fromDate !== null && this.toDate !== null){
      let momenttest = moment(this.sortedPricesList[0].fromDate)
      let startDate = moment(new Date(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`).toISOString());
      let endDate = moment(new Date(`${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`).toISOString());
      for (var m = startDate; m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        for (let index = 0; index < this.sortedPricesList.length; index++) {
            const price = this.sortedPricesList[index];
            if(m.isBetween(moment(price.fromDate) , moment(price.toDate),'day')){
                let day = m.isoWeekday();
                if(day === 6 || day ===7 )
                  this.totalAmount += price.weekEndPrice;
                else
                  this.totalAmount += price.dayPrice;
                  break;
            }
        }
      }
    }
      // console.log(this.totalAmount)
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  // validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
  //   debugger
  //   const parsed = this.formatter.parse(input);
  //   return parsed && this.calendar.isValid(NgbDate.from(parsed))
  //     ? NgbDate.from(parsed)
  //     : currentValue;
  // }

  public requestRental():void{
    this.router.navigate([`rentals/${this.id}/request-rental`]);
    this.setRentalDate()
  }

  setRentalDate() {
    this.getRentalsListService.setRentalData({
      "fromDate":this.fromDate,
      "toDate":this.toDate,
      "rentalName":this.rentalDetails.name,
      'unitId':this.rentalDetails.id,
      'status':this.rentalDetails.status,
      'totalInsurance':this.rentalDetails.totalInsurance,
      "amount":this.totalAmount + this.rentalDetails.totalInsurance,
      "single":this.rentalDetails.isSingle,
      "family":this.rentalDetails.isFamily,
      "insurances":this.rentalDetails.insurances
    });
  }

  public setMaxValue(){
    this.showMoreUtilities = !this.showMoreUtilities;
    if(this.showMoreUtilities) {
      this.max=this.rentalDetails.utilityIcons.length;
    }else {
      this.max=4;
    }
  }
}
