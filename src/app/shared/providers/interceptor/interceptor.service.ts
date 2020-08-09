import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { LanguageUpdateService } from "../language/language.service";

@Injectable({
  providedIn: "root"
})
export class AppInterceptor implements HttpInterceptor {
  constructor(private language: LanguageUpdateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // pp UVJDb2RlUHJlUHJvZDpQcmVAMTIzMzIx
    // p  UVJDb2RlUHJvZDpQcm9kQDEyMzMyMUA=
    // test VGVzdDp0ZXN0MTIz

    //const token: string =
    //  localStorage.getItem("token") || "Basic VGVzdDp0ZXN0MTIz";

    if (!request.headers.has("Content-type")) {
      request = request.clone({
        headers: request.headers.set("Content-type", "Application/json")
      });
    }

    //if (!request.headers.has("Authorization")) {
    //  request = request.clone({
    //    headers: request.headers.set("Authorization", token)
    //  });
    //}

    if (!request.headers.has("Accept-language")) {
      request = request.clone({
        headers: request.headers.set(
          "Accept-language",
          this.language.getCurrentLangSt()
        )
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 ||
          error.status === 403 ||
          error.status === 400
        ) {
          console.log("error.status", error.status);
        }
        return throwError(error);
      })
    );
  }
}
