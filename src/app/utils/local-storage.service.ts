import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getStorageItem(key: string): any {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item ) : null;
  }

}
