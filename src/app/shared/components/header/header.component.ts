import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LanguageUpdateService } from '../../../shared/providers/language/language.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    public title: string;
  isUser = false;
    constructor(private language: LanguageUpdateService, private router:Router ) {
      if (localStorage.getItem("accessToken")) {
        this.isUser = true;
      }
     }
    ngOnInit() {
        this.language.getCurrentLang().subscribe(lang => {

            if (lang === "ar") {
                this.title = "الرمز التجاري";
            }
            else {
                this.title = "QR Code Information";
            }
        })
    }


    public logOut(){
      let tenantId = localStorage.getItem('tenantId');
      localStorage.clear();
      localStorage.setItem('tenantId',tenantId)
      this.router.navigate(["./user/login"]);
    }
}
