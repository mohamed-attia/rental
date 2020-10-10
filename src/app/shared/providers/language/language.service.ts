import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LanguageUpdateService {
  private currentLang: BehaviorSubject<string> = new BehaviorSubject("ar");
  private menuItem: BehaviorSubject<string> = new BehaviorSubject("");
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

  setMenuItem(lang: string): void {
    this.menuItem.next(lang);
  }

  getMenuItem(): Observable<string> {
    return this.menuItem.asObservable();
  }


}
