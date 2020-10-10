import { Component, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { LanguageUpdateService } from "./../../providers/language/language.service";
import { Location } from "@angular/common";
import { Title } from '@angular/platform-browser';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language-switcher",
  templateUrl: "./language-switcher.component.html",
  styleUrls: ["./language-switcher.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSwitcherComponent implements OnInit {
  languages: string[];
  currentang: string;
  q: string;
  isTranslated: boolean;
  constructor(
    public translate: TranslateService,
    private location: Location,
    private language: LanguageUpdateService,
    private router: ActivatedRoute,
      private renderer: Renderer2
      , private titleService: Title
  ) {
    this.language.getCurrentLang().subscribe(lang => {
      this.currentang = lang;
    });
  }

  ngOnInit() {
    this.language.getLanguageStatus().subscribe(status => {
      this.languages = ["ar", "en"];
      this.isTranslated = status;
    });
    this.router.queryParamMap.subscribe(param => {
      if (param) {
        this.q = param.get("q");
      }
    });
  }

  changeLang(lang: string): void {
    let htmlTag = document.getElementsByTagName("html");

      if (lang === "ar") {
          this.titleService.setTitle('الرمز التجاري');
      this.renderer.removeClass(document.querySelector("html"), "ltr");
      this.renderer.addClass(document.querySelector("html"), "rtl");
      this.renderer.setAttribute(document.querySelector("html"), "lang", lang);
      } else {

          this.titleService.setTitle('Qr Code Information');
      this.renderer.removeClass(document.querySelector("html"), "rtl");
      this.renderer.addClass(document.querySelector("html"), "ltr");
      this.renderer.setAttribute(document.querySelector("html"), "lang", "en");
    }
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.language.setLang(lang);
    this.location.go(`${location.pathname}?lang=${lang}`);
  }
}
