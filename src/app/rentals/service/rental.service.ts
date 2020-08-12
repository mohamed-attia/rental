import {
  CrInfoDataInterface,
  EltizamInfoInterface
} from "src/app/shared/models/commericial-reg-system.model";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { RentalDtailsModel } from '../models/rentals.model';

@Injectable({
  providedIn: "root"
})
export class GetRentalsListService {
  // public CrInfoData: CrInfoDataInterface = {};

  constructor(private query: QueryService) {}

  public getRentasList(): Observable<Array<RentalDtailsModel>> {
    this.query.setURI(`EltizamInfoData`);
    this.query.setHeaders();
    return this.query.get();
  }

}
