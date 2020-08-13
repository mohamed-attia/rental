import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit, Renderer2 } from "@angular/core";

import { EndpointsService } from "src/app/shared/providers/endpoints/endpoints.service";
import { LanguageUpdateService } from "./shared/providers/language/language.service";
import { RentalUserService } from './rental-user/services/rental-user.service';
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private q: string;
  public isTranslated: boolean;
  private currLang: string;
  constructor(
    public translate: TranslateService,
    private router: ActivatedRoute,
    private language: LanguageUpdateService,
    private renderer: Renderer2,
    private titleService: Title,
    private rentalUserService:RentalUserService
  ) {
    this.setDefautLanguage("ar");
    this.getTanentId();
  }

  ngOnInit() {
    this.router.queryParamMap.subscribe((param: Params) => {
      this.currLang = param.get("lang");
      this.q = param.get("q");
      if (this.currLang) {
        this.setDefautLanguage(this.currLang);
        if (this.currLang === "ar") {
          this.changeHtmlAttr(true);
        } else if (this.currLang === "en") {
          this.changeHtmlAttr(false);
        }
      }
    });
  }

  getTanentId(){
  this.rentalUserService.getTanentId().subscribe(res=>{
    localStorage.setItem('tenantId',res.result['tenantId'])
  });
}

  setDefautLanguage(lang: string): void {
    this.translate.setDefaultLang(lang ? lang : "ar");
    this.translate.use(lang ? lang : "ar");
    this.language.setLang(lang);
    this.changeHtmlAttr(lang === "ar");
  }

  changeHtmlAttr(isRtl: boolean): void {
    if (isRtl) {
      this.titleService.setTitle("عربي");
      this.renderer.addClass(document.querySelector("html"), "rtl");
      this.renderer.removeClass(document.querySelector("html"), "ltr");
      this.renderer.setAttribute(document.querySelector("html"), "lang", "ar");
    } else {
      this.titleService.setTitle("english title");
      this.renderer.addClass(document.querySelector("html"), "ltr");
      this.renderer.removeClass(document.querySelector("html"), "rtl");
      this.renderer.setAttribute(document.querySelector("html"), "lang", "en");
    }
  }

  // checkLangstatus(q: string): void {
  //   this.endpointsService.getCrInfoData(q).subscribe(res => {
  //       if (res["body"] == null) {
  //           this._router.navigateByUrl(`/info/review?lang=ar&q=${this.q}`);
  //           this.renderer.removeClass(document.querySelector("html"), "ltr");
  //           this.renderer.addClass(document.querySelector("html"), "rtl");
  //       }
  //     this.renderer.setAttribute(
  //       document.querySelector("html"),
  //       "lang",
  //       this.currLang
  //     );
  //   });
  // }
}
