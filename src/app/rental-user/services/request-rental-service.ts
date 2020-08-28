import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { UserLoginModel } from '../models/user-login.model';
import { UserRegisterModel } from '../models/user-register.model';

@Injectable({
  providedIn: "root"
})
export class RequestRentalService {

  constructor(private query: QueryService) {}

  public sendAttachment(date): Observable<any> {
    console.log(date)
    this.query.setURI(`Document/UploadRequestFileToS3`);
    // this.query.setHeaders();
    return this.query.post(date);
  }

  // public sendUserREgisterData(body:UserRegisterModel): Observable<any> {
  //   console.log(body)
  //   this.query.setURI(`services/app/User/RegisterUser`);
  //   // this.query.setHeaders();
  //   return this.query.post(body);
  // }

  // public getTanentId(): Observable<any> {
  //   // alert()
  //   this.query.setURI(`services/app/Account/IsTenantAvailable`);
  //   // this.queryService.setHeaders();
  //   return this.query.post({
  //     "tenancyName": "client1"
  //   });
  // }

}
