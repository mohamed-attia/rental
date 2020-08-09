import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
  CrInfoDataInterface,
  EltizamInfoInterface

  //,TranslatedCrDataInterface
} from "src/app/shared/models/commericial-reg-system.model";

import { QueryService } from "../query-service/query.service";

@Injectable({
  providedIn: "root"
})
export class EndpointsService {
  public CrInfoData: CrInfoDataInterface = {};
  constructor(private query: QueryService) {}

  getCrInfoData(id: string): Observable<CrInfoDataInterface> {
    this.query.setURI(`CrInfoData?q=${id}`);
    this.query.setHeaders();
    return this.query.get();
  }

  //getTranslatedCrData(id: string): Observable<TranslatedCrDataInterface> {
  //    this.query.setURI(`CrInfoData?q=${id}`);
  //    this.query.setHeaders();
  //    return this.query.get();
  //}

  public getEltizamData(id: string): Observable<Array<EltizamInfoInterface>> {
    this.query.setURI(`EltizamInfoData?q=${id}`);
    this.query.setHeaders();
    return this.query.get();
  }

  public getQrCodeData(id: string): Observable<any> {
    this.query.setURI(`CRQRCode/Get?q=${id}`);
    this.query.setHeaders();
    return this.query.get();
  }

  public getQrSearchData(body): Observable<any> {
    this.query.setURI(`CRQRCode/Search`);
    // this.query.setHeaders();
    return this.query.post(body);
  }

  public getCaptchaData(token): Observable<any> {
    this.query.setURI(`Captcha?q=${token}`);
    this.query.setHeaders();
    return this.query.get();
  }
}
