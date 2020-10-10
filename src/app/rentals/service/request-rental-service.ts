import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RequestRentalService {

  private RequestResponseData: BehaviorSubject<{}> = new BehaviorSubject({});
  private Rentalimages: BehaviorSubject<{images:[],videos:[]}> = new BehaviorSubject({images:[],videos:[]});

  constructor(private query: QueryService, private http: HttpClient) {}

  public postFile(formData: FormData): Observable<any> {
    let tenantId = localStorage.getItem('tenantId')
    let url_ = `${environment.api}Document/UploadRequestFileToS3?tenantId=${tenantId}`;
    url_ = url_.replace(/[?&]$/, "");
    let options_: any = {
      body: formData,
      observe: "events",
      responseType: "json",
      reportProgress: true,
      headers: new HttpHeaders({}),
    };
    return this.http.request("post", url_, options_);
  }

  public postRequestRental(body): Observable<any> {
    this.query.setURI(`services/app/UnitRequests/CreateOrEdit`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public sendPaymentData(body): Observable<any> {
    this.query.setURI(`services/app/UnitRequests/CreateOrEdit`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public getUSerInfo(userId): Observable<any>{
    this.query.setHeaders();
    this.query.setURI(`services/app/User/GetUserForView?id=${userId}`);
    return this.query.get();
  }

  public getRequestResponseRentalData(): Observable<{}> {
    return this.RequestResponseData.asObservable();
  }
  public setRequestResponseRentalData(rentalData){
    this.RequestResponseData.next(rentalData);
  }

  public getRentalImages(): Observable<{images:[],videos:[]}> {
    return this.Rentalimages.asObservable();
  }
  public setrentalImages(rentalData){
    this.Rentalimages.next(rentalData);
  }
}
