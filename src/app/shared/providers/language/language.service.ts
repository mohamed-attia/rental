import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LanguageUpdateService {
  private currentLang: BehaviorSubject<string> = new BehaviorSubject("ar");
  private isTranslated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  setLanguageStatus(status: boolean): void {
    this.isTranslated.next(status);
  }

  getLanguageStatus() {
    return this.isTranslated.asObservable();
  }

  setLang(lang: string): void {
    this.currentLang.next(lang);
  }

  getCurrentLang(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getCurrentLangSt(): string {
    return this.currentLang.getValue();
  }
}
