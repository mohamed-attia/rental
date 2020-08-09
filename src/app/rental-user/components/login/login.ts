import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { Component, OnInit, Renderer2 } from "@angular/core";

import { EndpointsService } from "src/app/shared/providers/endpoints/endpoints.service";
import { SwUpdate } from "@angular/service-worker";
import { Title } from '@angular/platform-browser';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-login",
  templateUrl:'./login.html'
})
export class Login implements OnInit {

  constructor() {}

    ngOnInit() {}

}
