import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RequestRentalService {
  constructor(private query: QueryService, private http: HttpClient) {}

  public postFile(formData: FormData): Observable<any> {
    let url_ = `${environment.api}Document/UploadRequestFileToS3`;
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
}
