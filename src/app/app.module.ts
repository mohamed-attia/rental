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
import { RouterModule, UrlSerializer } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

import { SharedModule } from "./shared/shared.module";
import { MciModule } from "./rental-user/rental-user.module";

import { routes } from "./app-routing";

import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config.service';
import { of, Observable, ObservableInput } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

export  function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('/assets/config.json')
        .pipe(
          map((x: ConfigService) => {
            config.baseUrl = x.baseUrl;
            config.code = x.code;
            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            if (x.status !== 404) {
              resolve(false);
            }
            resolve(true);
            return of({});
          })
        ).subscribe(res=>{
          environment.api = config['baseUrl'];
          environment.code = config['code'];
        });
    });
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: "thiqah-ng-template" }),
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    MciModule,
    ServiceWorkerModule.register("./ngsw-worker.js", {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
  ],
  declarations: [LoaderComponent, AppComponent, NotFoundComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        HttpClient,
          ConfigService
        ,Title
      ],
          multi: true
      ,
    },
    { provide: UrlSerializer, useClass: UrlSerializerService },
    { provide: 'googleTagManagerId', useValue: environment.code }
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
