import { Pipe, PipeTransform } from "@angular/core";
import { toHijri } from "hijri-converter";

@Pipe({
  name: "convertDateHijri"
})
export class ConvertGerogianToHijriPipe implements PipeTransform {
  public hijriDate;
  transform(dateInGeorgian: string) {
    if (dateInGeorgian === null || dateInGeorgian === undefined || dateInGeorgian === "") {
      return;
    } else {
      let splitedDate;
      let dateWithoutDash;
      splitedDate = dateInGeorgian.split("T");
      dateWithoutDash = splitedDate[0].split("-");
      let y = +dateWithoutDash[0];
      let m = +dateWithoutDash[1];
      let d = +dateWithoutDash[2];
      this.hijriDate = toHijri(y, m, d);
      return this.hijriDate['hd'] + '/' + this.hijriDate['hm'] + '/' + this.hijriDate['hy'];
    }
  }
}
