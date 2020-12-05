import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../utils/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLogged) {
        this.router.navigate(['/tech-list']);
        return false;
      }
      return true;
  }

}
