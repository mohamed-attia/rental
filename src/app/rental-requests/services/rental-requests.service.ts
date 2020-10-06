import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { QueryService } from "../../shared/providers/query-service/query.service";

@Injectable({
  providedIn: "root"
})
export class RentalRequestsUserService {

  constructor(private query: QueryService) {}
  
  public getRentalRequests(): Observable<any> {
    let userId = localStorage.getItem('userId')
    this.query.setURI(`services/app/UnitRequests/GetRequestsByUserId?userId=${userId}`);
    this.query.setHeaders();
    return this.query.get();
  }
}
