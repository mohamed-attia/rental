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

@Component({
  selector: "app-rental-details",
  templateUrl: "./rental-details.component.html",
})
export class RentalDetailsComponent implements OnInit {
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
  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: "",
    prevArrow: "",
    dots: true,
    infinite: true,
  };

  constructor(
    private getRentalsListService: GetRentalsListService,
    private actRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router:Router
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  ngOnInit() {
    this.getRentalId();
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
        if (this.rentalDetails["images"].length > 0) {
          for (let i = 0; i < this.rentalDetails["images"].length; i++) {
            this.imagesList.push(this.rentalDetails["images"][i]);
            this.videoList.push(this.rentalDetails["videos"][i]);
          }
        }
      });
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
    console.log('fromDate',this.fromDate)
    console.log('fromDate',this.toDate)
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

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  public requestRental():void{
    this.router.navigate([`rentals/${this.id}/request-rental`]);
    this.setRentalDate()
  }

  setRentalDate() {
 let obj = {
      "fromDate":this.fromDate,
      "toDate":this.toDate,
      "rentalName":this.rentalDetails.name
    }
    this.getRentalsListService.setRentalData(obj);
  }
}
