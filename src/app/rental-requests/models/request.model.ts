export interface RequestModel {
  unit: UnitModel;
  requestNumber: number;
  fromDate: Date;
  toDate: Date;
  note: string;
  unitType: number;
  totalAmount:number
  status:number
}

interface UnitModel {
  name: string;
  latitude: string;
  location: string;
  longitude: string;
  insurances:number;
  paymentLinkExpiresAfter:number
}
