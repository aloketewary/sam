import { Injectable, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalDataHandler } from '../class/global-data-handler';
import { AuthService } from '../../auth/services/auth.service';
import { Constants } from '../class/constants';
import { CookiesStorageService } from 'ngx-store';
import { LocaleService } from 'angular-l10n';

@Injectable({
  providedIn: 'root'
})
export class CommonAppService implements OnInit {
  constructor(
    private gdHandler: GlobalDataHandler,
    private authService: AuthService,
    private cookiesStorageService: CookiesStorageService,
    @Inject(LocaleService) public locale: LocaleService,
  ) {
    this.gdHandler.availableLanguages = [
      { name: 'english', transName: 'APP.ENGLISH', localeName: 'en' },
      { name: 'hindi', transName: 'APP.HINDI', localeName: 'hn' },
    ];
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  /**
   * Calculate the expired time for Authentication token
   * @param authtokenexpires
   * @returns Date
   */
  getCalculatedAuthTokenExpires(authtokenexpires: any): Date {
    if (this.isNullOrUndefined(authtokenexpires)) {
      authtokenexpires = new Date(new Date().toUTCString()).getMinutes() + 30;
    }
    return new Date(authtokenexpires);
  }

  /**
   * Check is there any logged in user or not
   * @returns Observable<boolean>
   */
  checkForLoggedInUser(): Observable<boolean> {
    const resp = this.authService.isLoggedIn();
    return resp;
  }

  // Languages change from here
  switchLanguage(language: string) {
    this.locale.setCurrentLanguage(language);
  }

  /**
   * isNullOrUndefined
   */
  public isNullOrUndefined(obj: any): boolean {
    return (obj != null && obj !== undefined) ? false : true;
  }
}
