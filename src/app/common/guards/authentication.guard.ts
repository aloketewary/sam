import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../class/constants';
import { CookiesStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookiesStorageService: CookiesStorageService,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cookiesStorageService.get(Constants.LOGIN_PERSISTENCE_NAME) != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
