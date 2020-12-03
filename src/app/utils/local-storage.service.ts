import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface StorageChange {
  key: string;
  value: string;
  storageType: 'localStorage' | 'sessionStorage';
}

export interface StorageGetItem {
  key: string;
  storageType: 'localStorage' | 'sessionStorage';
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public storageChange$: ReplaySubject<StorageChange> = new ReplaySubject();

  constructor() { }

  public setStorageItem(change: StorageChange): void {
    window[change.storageType].setItem(change.key, JSON.stringify(change.value));
    this.storageChange$.next(change);
  }

  public getStorageItem(item: StorageGetItem): any {
    const storageItem = window[item.storageType].getItem(item.key) || '';
    const itemParsed = typeof storageItem === 'string' ? storageItem :  JSON.parse( storageItem );
    return itemParsed;
  }

  public removeStorageItem(item: StorageGetItem): void {
    window[item.storageType].removeItem(item.key);
    this.storageChange$.next({
      key: item.key,
      value: '',
      storageType: item.storageType
    });
  }
}
