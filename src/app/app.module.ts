import { environment } from 'src/environments/environment';
import { UrlSerializerService } from './shared/providers/urlSerializer/url-serializer.service';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import {
  NgModule,
  PLATFORM_ID,
  APP_ID,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from "@angular/core";
import { BrowserModule ,Title} from "@angular/platform-browser";
import {  UrlSerializer } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { SharedModule } from "./shared/shared.module";
import { RentalUserModule } from "./rental-user/rental-user.module";

import {AppRoutingModule} from './app-routing';
import { AppComponent } from "./app.component";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';
import { of, Observable, ObservableInput } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: "thiqah-ng-template" }),
    SharedModule.forRoot(),
    RentalUserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  declarations: [LoaderComponent, AppComponent, NotFoundComponent],
  providers: [
    { provide: UrlSerializer, useClass: UrlSerializerService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {

    const platform = isPlatformBrowser(platformId)
      ? "in the browser"
      : "on the server";
    // console.log(`Running ${platform} with appId=${appId}`);
  }
}
