export interface CrInfoDataInterface extends CrPersonInfo {
  crNumber?: string;
  crName?: string;
  expireDate?: Date;
  businessTypeName?: string;
    flatActivities?: string;
    nationalNumber?: string;
  companyPeriod?: number;
  primaryUrl?: string;
  maaroofUrl?: string;
  dateTime?: Date;
  crLocationName?: string;
  crStatus?: string;
  contractNumber?: string;
  isMain?: boolean;
  isTranslated?: boolean;
  fax?: string;
  phone?: string;
  persons?: Array<CrPersonInfo>;
  isCompany?: boolean;
  category?: number;
  activities?: Array<ActivityInfo>;

}

//export interface TranslatedCrDataInterface extends CrPersonInfo {
//    crNumber?: string;
//    crName?: string;
//    expireDate?: Date;
//    businessTypeName?: string;
//    flatActivities?: string;
//    companyPeriod?: number;
//    primaryUrl?: string;
//    maaroofUrl?: string;
//    dateTime?: Date;
//    crLocationName?: string;
//    crStatus?: string;
//    contractNumber?: string;
//    isMain?: boolean;
//    isTranslated?: boolean;
//    fax?: string;
//    phone?: string;
//    persons?: Array<CrPersonInfo>;
//    isCompany?: boolean;
//    category?: number;
//    activities?: Array<ActivityInfo>;
//}

interface ActivityInfo {
  code?: string;
  description?: string;
  descriptionEn?: string;
}
interface CrPersonInfo {
  nname?: string;
  isOwner?: boolean;
}

enum EltizamStatusEnum {
  Good,
  Bad,
  Error,
  Nodata
}

export enum EltizamServicesEnum {
      EstablishmentStatistics = 0 ,            // "نطاقات",
      EstablishmentStatisticsStatus = 1 ,      // "شهادة السعودة",
      Chambers = 2 ,                           //"اشتراك الغرفة التجارية",
      ZakatCertificate = 3,                    //"شهادة الزكاة",
      MOMRAShopLicenses = 4                    //"رخصة البلدية",
}

export interface EltizamInfoInterface {
  service?: number;
  status?: number;
  bussinessMessageAR?: string;
  bussinessMessageEN?: string;
}
