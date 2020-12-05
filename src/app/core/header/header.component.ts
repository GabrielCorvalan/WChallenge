import { LocalStorageService } from './../../utils/local-storage.service';
import { AuthService } from './../../utils/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token$: any;
  constructor(public authService: AuthService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  get numberFavoritesTechs(): any {
    return this.localStorageService.getStorageItem('favoritesTechs').filter((tech: any) => tech.isFavorite).length;
  }

}
