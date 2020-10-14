import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LanguageUpdateService } from '../../providers/language/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 @Input()currentComponent:string;
  isUser = false;
  constructor(private router: Router, private languageUpdateService:LanguageUpdateService) {
    this.languageUpdateService.getMenuItem().subscribe(res=>{
      this.currentComponent =res
    })
    if (localStorage.getItem("accessToken")) {
      this.isUser = true;
    }
  }

  ngOnInit() {}

  public navigateToUser(){
    this.router.navigate(['rental-requests/user-profile'])
  }

  public navigateRequests(){
    this.router.navigate(['rental-requests']);
  }

  public navigateToHome(){
    this.router.navigate(['rentals'])
  }

}
