import { ITech } from './../../interfaces/ITech';
import { LocalStorageService } from './../../utils/local-storage.service';
import { LoadingService } from './../../utils/loading/loading.service';
import { finalize, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TechListsService } from './tech-lists.service';
import { findIndex } from 'lodash';
interface IOrderBy {
  orderProperty: string;
  type: 'asc' | 'desc';
}

@Component({
  selector: 'app-tech-lists',
  templateUrl: './tech-lists.component.html',
  styleUrls: ['./tech-lists.component.scss']
})
export class TechListsComponent implements OnInit {

  techs: Array<ITech> = [];

  favoritesTechs: any = [];
  filteredTechs: Array<ITech> = [];

  order: IOrderBy = {
    type: 'asc',
    orderProperty: 'tech'
  };

  enabledFilters: Array<string> = ['tech'];

  searchControl = new FormControl('');
  constructor(private _techListService: TechListsService,
              private _loadingService: LoadingService,
              private _localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this._loadingService.show();

    this.favoritesTechs = this._localStorageService.getStorageItem('favoritesTechs') || [];

    this._techListService.getTechs().pipe(
      finalize(() => this._loadingService.hide())
    )
    .subscribe((response) => {
      this.techs = response;
      this.filteredTechs = response;
    });

    this.searchControl.valueChanges.pipe(
      map(newValue => newValue.toLocaleLowerCase())
    )
    .subscribe(
      (newControlValue: string) => {

        this.enabledFilters.forEach((enabledFilter, index) => {

          const filtered =  index === 0 ? this.filterTechsByProperty(enabledFilter, newControlValue) :
            this.filterTechsByProperty(enabledFilter, newControlValue).filter(
              filteredNewValue => !(this.filteredTechs.includes(filteredNewValue))
            )
          this.filteredTechs = index === 0 ? filtered : this.filteredTechs.concat(filtered);
        });

      }
    )
  }

  setOrderProperty(orderProperty: string): void {
    this.order = {
      type: this.order.type === 'asc' ? 'desc' : 'asc',
      orderProperty
    }
  }

  saveFavorite(techName: string): void {
    const favoriteTech = this.favoritesTechs.find((tech: any) => tech.techName === techName);
    if (favoriteTech) {
      favoriteTech.isFavorite = !favoriteTech.isFavorite
    } else {
      this.favoritesTechs.push({
        techName,
        isFavorite: true
      });
    }

    this._localStorageService.setStorageItem('favoritesTechs', this.favoritesTechs);
  }

  isFavorite(techName: string): boolean {
    const favoriteTech = this.favoritesTechs.find((tech: any) => tech.techName == techName );
    return favoriteTech?.isFavorite;
  }

  filterTechsByProperty(property: string, searchValue: any): Array<ITech> {
    const filtered = this.techs.filter(
      (technology: any) => technology[property].toLocaleLowerCase().includes(searchValue)
    );
    return filtered;
  }

  filteredProperty(techName: string): void {
    if (this.enabledFilters.find(enableFilter => enableFilter === techName)) {
      this.enabledFilters = this.enabledFilters.filter(enableFilter => enableFilter !== techName)
    } else { this.enabledFilters.push(techName) }

    this.searchControl.setValue(this.searchControl.value);
  }

  get orderIsAsc(): boolean {
    return this.order.type === 'asc';
  }

  isFilterActive(techName: string): any {
    const finded = this.enabledFilters.find(filterEnabled => filterEnabled === techName);
    return finded;
  }

}
