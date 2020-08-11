import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryService } from "../../shared/providers/query-service/query.service";

@Injectable({
  providedIn: "root"
})
export class RentalUserService {

  constructor(private query: QueryService) {}

  public sendUserLoginData(body): Observable<any> {
    console.log(body)
    this.query.setURI(`CRQRCode/Search`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public sendUserREgisterData(body): Observable<any> {
    console.log(body)

    this.query.setURI(`CRQRCode/Search`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

}
