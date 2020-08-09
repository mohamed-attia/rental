import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Location } from "@angular/common";
import {
  CrInfoDataInterface,
  EltizamInfoInterface,
  EltizamServicesEnum
} from "./../../../shared/models/commericial-reg-system.model";
import { EndpointsService } from "src/app/shared/providers/endpoints/endpoints.service";
import { LanguageUpdateService } from "./../../../shared/providers/language/language.service";

@Component({
  selector: "app-commericial-reg-system",
  templateUrl: "./commericial-reg-system.component.html",
  styleUrls: ["./commericial-reg-system.component.scss"],
  encapsulation: ViewEncapsulation.None

})
export class CommericialRegSystemComponent implements OnInit, OnDestroy {
  public crInfoData: CrInfoDataInterface = {};
  public eltizamDataList: Array<EltizamInfoInterface> = [];
  public id: string;
  public lang: string;
  public eltizamServicesEnum = EltizamServicesEnum;
  public istranslated: boolean;
  public isLoaded:boolean = false
  constructor(
    private endpoints: EndpointsService,
    private actRoute: ActivatedRoute,
      private language: LanguageUpdateService,
      private location: Location
  ) {
    this.getUrlParams();
    this.language.getCurrentLang().subscribe((lang) => {
      this.getUrlParams();
    });
  }

  ngOnInit() {
  }

  getUrlParams() {
    this.actRoute.queryParamMap.subscribe(
      params => {
        this.id = params.get("q");
        this.lang = params.get("lang");
        if (this.id) {
          this.getCommercialRegisterData();
          this.getEltizamData();
        }
      },
      err => console.log(err.message)
    );
  }
  
  public getCommercialRegisterData(): void {
    this.endpoints.getCrInfoData(this.id).subscribe(
      res => {
        this.crInfoData = res["body"];
            this.language.setLanguageStatus(res["body"].isTranslated);
            this.istranslated = res["body"].isTranslated;
            if (!this.istranslated && this.lang === "en") {
                this.location.replaceState(`/info/review?lang=ar&q=${this.id}`);
            }

            this.isLoaded = true
      },
      err => console.log(err.message)
    );
  }

  public getEltizamData(): void {
    this.endpoints.getEltizamData(this.id).subscribe(
      res => {
        this.eltizamDataList = res["body"];
        this.isLoaded = true
      },
      err => console.log(err.message)
    );
  }

  public getCrStatusClassBox(crStatus) {
    if (crStatus === 1) return "active-box";
    else if (crStatus === 2 || crStatus === 3) return "warning-box ";
    else if (crStatus === 4) return "danger-box";
  }
  
  //public serviceValue(serviceIndex: number): string {
  //  if (this.eltizamDataList[serviceIndex].service === 0)
  //    return this.eltizamServicesEnum.EstablishmentStatistics;
  //  else if (this.eltizamDataList[serviceIndex].service === 1)
  //    return this.eltizamServicesEnum.EstablishmentStatisticsStatus;
  //  else if (this.eltizamDataList[serviceIndex].service === 2)
  //    return this.eltizamServicesEnum.Chambers;
  //  else if (this.eltizamDataList[serviceIndex].service === 3)
  //    return this.eltizamServicesEnum.ZakatCertificate;
  //  else if (this.eltizamDataList[serviceIndex].service === 4)
  //    return this.eltizamServicesEnum.MOMRAShopLicenses;
  //}
  
  public getStatusClass(statusIndex: number): string {
    if (this.eltizamDataList[statusIndex].status === 0) return "status-active";
    if (this.eltizamDataList[statusIndex].status === 1) return "status-bad";
    if (this.eltizamDataList[statusIndex].status === 2)
      return "status-not-working ";
    if (this.eltizamDataList[statusIndex].status === 3) return "status-no-data";
  }

    public getStatusMesssage(index) {
        let currLang;
        this.language.getCurrentLang().subscribe(lang => {
            currLang = lang
        })
        if (currLang === 'en' && this.istranslated) {
            if (
                this.eltizamDataList[index].status === 0 &&
                this.eltizamDataList[index].bussinessMessageEN === null
            ) {
                return "Active";
            } else if (
                this.eltizamDataList[index].status === 1 &&
                this.eltizamDataList[index].bussinessMessageEN === null
            ) {
                return "Not Active";
            } else if (
                this.eltizamDataList[index].status === 2 &&
                this.eltizamDataList[index].bussinessMessageEN === null
            ) {
                return "Service is not working now, please try again later";
            } else if (
                this.eltizamDataList[index].status === 3 &&
                this.eltizamDataList[index].bussinessMessageEN === null
            ) {
                return "No data";
            } else {
                return this.eltizamDataList[index].bussinessMessageEN;
            }

        } else {
            if (
                this.eltizamDataList[index].status === 0 &&
                this.eltizamDataList[index].bussinessMessageAR === null
            ) {
                return "نشط";
            } else if (
                this.eltizamDataList[index].status === 1 &&
                this.eltizamDataList[index].bussinessMessageAR === null
            ) {
                return "غير نشط";
            } else if (
                this.eltizamDataList[index].status === 2 &&
                this.eltizamDataList[index].bussinessMessageAR === null
            ) {
                return "الخدمة لا تعمل حالياً ، الرجاء المحاولة لاحقاً";
            } else if (
                this.eltizamDataList[index].status === 3 &&
                this.eltizamDataList[index].bussinessMessageAR === null
            ) {
                return "لا يوجد بيانات";
            } else {
                return this.eltizamDataList[index].bussinessMessageAR;
            }
        }
    }




  ngOnDestroy() {
    this.isLoaded = false;
  }
}
