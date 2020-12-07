import { Router } from '@angular/router';
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
  currentUrl = '';
  constructor(public authService: AuthService,
              private localStorageService: LocalStorageService,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get numberFavoritesTechs(): any {
    return this.localStorageService.getStorageItem('favoritesTechs')?.filter((tech: any) => tech.isFavorite).length;
  }

  changeLanguage(lang: string): void {
    this.activeLang = lang;
    this.translate.use(lang);
  }

  get intoSignupPage(): boolean {
    return this.router.url === '/sign-up';
  }

  get intoLandingPage(): boolean {
    return this.router.url === '/' || this.router.url.includes('/#');
  }

}
