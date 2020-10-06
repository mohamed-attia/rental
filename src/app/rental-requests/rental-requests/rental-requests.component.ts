import { Component, OnInit } from '@angular/core';

import { RentalRequestsUserService } from '../services/rental-requests.service';

@Component({
  selector: 'app-rental-requests',
  templateUrl: './rental-requests.component.html',
  styleUrls: ['./rental-requests.component.css']
})
export class RentalRequestsComponent implements OnInit {

  constructor(private rentalRequestsUserService: RentalRequestsUserService) { }

  ngOnInit() {
    this.getRentalRequests()
  }

  private getRentalRequests() {
    this.rentalRequestsUserService.getRentalRequests().subscribe(res=>{
      console.log(res)
    })
  }

  public selectedRequestType(filterType){

  }

}
