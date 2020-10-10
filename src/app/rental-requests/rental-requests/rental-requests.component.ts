import { Component, OnInit } from '@angular/core';

import { LanguageUpdateService } from 'src/app/shared/providers/language/language.service';
import { RentalRequestsUserService } from '../services/rental-requests.service';

@Component({
  selector: 'app-rental-requests',
  templateUrl: './rental-requests.component.html'
})
export class RentalRequestsComponent implements OnInit {

  constructor(private rentalRequestsUserService: RentalRequestsUserService, private languageUpdateService:LanguageUpdateService) {
    this.rentalRequestsUserService.setHeaderTitle('RentalRequests.Reuests');
    this.languageUpdateService.setMenuItem('request');
   }

  ngOnInit() {
    this.getRentalRequests();

  }

  private getRentalRequests() {
    this.rentalRequestsUserService.getRentalRequests().subscribe(res=>{
      console.log(res)
    })
  }

  public selectedRequestType(filterType){}

}
