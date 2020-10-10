import { Component, OnInit } from '@angular/core';

import { RentalRequestsUserService } from '../services/rental-requests.service';

@Component({
  selector: 'app-requests-layout',
  templateUrl: './requests-layout.component.html'
})
export class RequestsLayoutComponent implements OnInit {
  title: string;

  constructor(private rentalRequestsUserService:RentalRequestsUserService) { }

  ngOnInit() {
    this.rentalRequestsUserService.getHeaderTitle().subscribe(res=>{
      this.title = res
    })
  }

}
