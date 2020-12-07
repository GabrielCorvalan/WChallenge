import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadings: any = {};
  public isLoading = false;

  constructor() {}

  show(name = 'default') {
    this.loadings[name] = true;
  }

  hide(name = 'default') {
    this.loadings[name] = false;
  }

  register(name = 'default') {
    if (!this.loadings.hasOwnProperty(name)) {
      this.loadings[name] = false;
    }
  }

  // unregister(name = 'default') {
  //   if (this.loadings.hasOwnProperty(name)) {
  //     delete this.loadings[name];
  //   }
  // }

  get(name = 'default') {
    return this.loadings[name];
  }
}
