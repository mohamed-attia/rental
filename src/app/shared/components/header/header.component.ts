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
    constructor(private language: LanguageUpdateService, private router:Router ) { }
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
      localStorage.clear();
      this.router.navigate(["./user/login"]);
    }
}
