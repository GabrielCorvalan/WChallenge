import { LocalStorageService } from './../../utils/local-storage.service';
import { AuthService } from './../../utils/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token$: any;
  activeLang = 'es';

  constructor(public authService: AuthService,
              private localStorageService: LocalStorageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  get numberFavoritesTechs(): any {
    return this.localStorageService.getStorageItem('favoritesTechs')?.filter((tech: any) => tech.isFavorite).length;
  }

  changeLanguage(lang: string): void {
    this.activeLang = lang;
    this.translate.use(lang);
  }

}
