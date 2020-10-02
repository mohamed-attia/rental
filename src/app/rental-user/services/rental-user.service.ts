import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { QueryService } from "../../shared/providers/query-service/query.service";
import { UserLoginModel } from '../models/user-login.model';
import { UserRegisterModel } from '../models/user-register.model';

@Injectable({
  providedIn: "root"
})
export class RentalUserService {
  private TenantImages: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor(private query: QueryService) {}

  public sendUserLoginData(body:UserLoginModel): Observable<any> {
    this.query.setURI(`TokenAuth/Authenticate`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public sendUserREgisterData(body:UserRegisterModel): Observable<any> {
    this.query.setURI(`services/app/User/RegisterUser`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public getTanentId(): Observable<any> {
    this.query.setURI(`services/app/Account/IsTenantAvailable`);
    // this.queryService.setHeaders();
    return this.query.post({
      "tenancyName": "client1"
    });
  }

  getTenantImages() {
    return this.TenantImages.asObservable();
  }

  setTenantImages(images: []): void {
    this.TenantImages.next(images);
  }

}
