import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { QueryService } from "../../shared/providers/query-service/query.service";

@Injectable({
  providedIn: "root"
})
export class RentalRequestsUserService {

  private currentHreaderTitle: BehaviorSubject<string> = new BehaviorSubject("Requests");
  constructor(private query: QueryService) {}

  public getRentalRequests(): Observable<any> {
    let userId = localStorage.getItem('userId')
    this.query.setURI(`services/app/UnitRequests/GetRequestsByUserId?userId=${userId}`);
    this.query.setHeaders();
    return this.query.get();
  }

  public sendUserProfileDate(userData): Observable<any> {
    this.query.setURI(`services/app/UnitRequests/GetRequestsByUserId`);
    // this.query.setHeaders();
    return this.query.post(userData);
  }

  setHeaderTitle(title: string): void {
    this.currentHreaderTitle.next(title);
  }

  getHeaderTitle(): Observable<string> {
    return this.currentHreaderTitle.asObservable();
  }
}
