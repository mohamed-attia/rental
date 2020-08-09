import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "rental/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];
