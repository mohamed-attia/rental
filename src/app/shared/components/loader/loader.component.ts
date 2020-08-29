//loader.interceptor.ts

import { Component, OnInit } from "@angular/core";

import { LoaderService } from "./loader.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-loading",
  templateUrl: "./loader.component.html",
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  loading: boolean;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {}
}
