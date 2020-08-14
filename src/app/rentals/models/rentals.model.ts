export interface RentalModel {
 "unit": RetnalDataModel,
  "unitGroupNameAr": string,
}

interface RetnalDataModel {
  "nameAr": string
  "nameEn": string
  "description": string
  "location": string
  "longitude": string
  "latitude": string
  "status": number,
  "hasLight": boolean,
  "hasWater": boolean,boolean
  "hasInternet": boolean,
  "hasParking": boolean,
  "unitGroupId": number,
  "id":number,
  "images": Array<RentalImageModel>,
  "video": Array<RentalVideoModel>,
  "prices": Array<RentalPriceModel>
}

interface RentalImageModel {
  "path": "https://q-xx.bstatic.com/xdata/images/hotel/840x460/124346702.jpg?k=73447c106017f39a9646d8c78fd9075f2c3d395e9686dd6fdbb0e4cd1268fc37&o=\t",
  "type": null,
  "isMain": true,
  "isOnSlider": true,
  "sliderOrder": 1,
  "unitId": 1,
  "id": 3
}

interface RentalVideoModel{
        "path": string,
        "unitId": number,
        "id": number
}

interface RentalPriceModel{
  "dayPrice": number,
  "weekEndPrice": string
  "priceOrder": number,
  "fromDate": string
  "toDate": string
  "unitId": number,
  "id": number
}
