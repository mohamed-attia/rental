import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AppInterceptor } from "./providers/interceptor/interceptor.service";
import { CommonModule } from "@angular/common";
import { ConvertGerogianToHijriPipe } from "./pipes/convert-date.pipe";
import { EndpointsService } from "./providers/endpoints/endpoints.service";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LanguageSwitcherComponent } from "./components/language-switcher/language-switcher.component";
import { LanguageUpdateService } from "./providers/language/language.service";
import { LoaderInterceptor } from "./providers/interceptor/loader-interceptor.service";
import { LoaderService } from "./components/loader/loader.service";
import { QueryService } from "./providers/query-service/query.service";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { UrlSerializerService } from "./providers/urlSerializer/url-serializer.service";
import { MenuComponent } from './components/menu/menu.component';

const services = [
  QueryService,
  EndpointsService,
  LoaderService,
  UrlSerializerService,
  LanguageUpdateService,
];

const sharedModules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  NgbPaginationModule,
  NgbModule,
  TranslateModule,
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const sharedMComponents = [
  LanguageSwitcherComponent,
  HeaderComponent,
  FooterComponent,
  MenuComponent
];

@NgModule({
  declarations: [sharedMComponents, ConvertGerogianToHijriPipe],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [...sharedModules, sharedMComponents, ConvertGerogianToHijriPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
  constructor() {}

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...services,
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      ]
    };
  }
}
