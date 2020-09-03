import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading = new BehaviorSubject(false);
  constructor() { }
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }

}
