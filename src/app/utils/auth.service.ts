import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // public token$: Observable<string>;

  constructor() {

    // this.storageService.storageChange$.next({
    //   key: 'token',
    //   storageType: 'localStorage',
    //   value: this.storageService.getStorageItem({key: 'token', storageType: 'localStorage'})
    // })

    // this.token$ = this.storageService.storageChange$.pipe(
    //   filter(({ storageType }) => storageType === 'localStorage'),
    //   filter(({ key }) => key === 'token'),
    //   pluck('value')
    // );
  }

  get isLogged(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
