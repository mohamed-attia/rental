import { BehaviorSubject, Observable } from "rxjs";
import {
  CrInfoDataInterface,
  EltizamInfoInterface,
} from "src/app/shared/models/commericial-reg-system.model";

import { Injectable } from "@angular/core";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { RentalModel } from "../models/rentals.model";

@Injectable({
  providedIn: "root",
})
export class GetRentalsListService {
  // public CrInfoData: CrInfoDataInterface = {};
  private rentalData: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(private query: QueryService) {}

  public getRentasList(): Observable<Array<RentalModel>> {
    this.query.setURI(
      `services/app/Units/GetAll?StatusFilter=-1&HasLightFilter=-1&HasWaterFilter=-1&HasInternetFilter=-1&HasParkingFilter=-1`
    );
    this.query.setHeaders();
    return this.query.get();
  }

  public getRentaDetailsById(rentalId: number): Observable<RentalModel> {
    this.query.setURI(`services/app/Units/GetUnitForView?id=${rentalId}`);
    this.query.setHeaders();
    return this.query.get();
  }

  public getRentalData(): Observable<{}> {
    return this.rentalData.asObservable();
  }
  public setRentalData(rentalData){
    this.rentalData.next(rentalData);
  }
}
