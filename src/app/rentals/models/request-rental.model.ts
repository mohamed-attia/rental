export interface RequestRentalModel {
   unitType  ?: number,
   TotalAmount  ?: number,
   totalInsurance  ?: number,
   status  ?: number,
   note  ?: string,
   paymentStatus  ?: number,
   paymentNote  ?: string,
   unitId  ?: number,
   fromDate  ?: string,
   toDate  ?: string,
   id  ?: number,
   user?: {
    fullName?:string,
     id  ?: number,
     userName  ?: string,
     emailAddress  ?: string,
     phoneNumber  ?: string,
     password  ?: string,
     tenantId  ?: number,
     acceptTermsAndConditions  ?: boolean,
     address  ?:  string ,
     setRandomPassword  ?: boolean,
     shouldChangePasswordOnNextLogin  ?: boolean,
     isGuest  ?: boolean
  },
   images?: [
    {
       path  ?:  string ,
       unitRequestId  ?: number,
       type  ?:  string ,
       id  ?: number
    }
  ],
}
