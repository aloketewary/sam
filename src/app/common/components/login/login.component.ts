import { Component, OnInit, Inject } from '@angular/core';
import { Language } from 'angular-l10n';
import { GlobalDataHandler } from '../../class/global-data-handler';
import { FormErrorStateMatcher } from '../../class/form-error-state-matcher';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../../class/constants';
import { CommonAppService } from '../../services/common-app.service';
import { LoggerService } from '../../services/logger.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Language() lang: string;
  errorCode: string;
  matcher: FormErrorStateMatcher;
  loginForm: FormGroup;
  user: User;
  isLoginInitiated: boolean;
  defaultLang: string;

  constructor(
    @Inject(GlobalDataHandler) private gdHandler: GlobalDataHandler,
    @Inject(FormBuilder) private _formBuilder: FormBuilder,
    @Inject(Router) private router: Router,
    @Inject(CommonAppService) private commonAppService: CommonAppService,
    @Inject(LoggerService) private log: LoggerService,
    @Inject(SharedService) private sharedService: SharedService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(CookiesStorageService) private cookiesStorageService: CookiesStorageService,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
  ) {
    this.matcher = new FormErrorStateMatcher();
    this.user = new User();
    this.initialize();
    this.defaultLang = 'en';
  }

  ngOnInit() {
    this.initForms();
    this.defaultLang = this.lang;
  }

  initialize(): void {
    this.commonAppService.checkForLoggedInUser().subscribe(res => {
      this.gdHandler.isLogin = res;
      if (res) {
        this.gdHandler.userProfile = this.localStorageService.get(Constants.USER_PROFILE_DATA);
        this.gdHandler.currentUserRole = this.gdHandler.userProfile.userType;
        this.navigateUserByRole();
      }
    });
  }

  initForms(): void {
    this.loginForm = this._formBuilder.group({
      emailField: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  onLoginSubmit() {
    this.isLoginInitiated = true;
    this.authService.userAuthentication(this.user.email, this.user.password).subscribe((data: any) => {
      if (data.result != null && data.result.length > 0) {
        this.cookiesStorageService.set(Constants.LOGIN_PERSISTENCE_NAME, data.authtoken,
          this.commonAppService.getCalculatedAuthTokenExpires(data.authtokenexpires));
        this.authService.isLoginSubject.next(true);
        this.gdHandler.userProfile = data.result[0];
        this.gdHandler.currentUserRole = this.gdHandler.userProfile.userType;
        this.localStorageService.set(Constants.USER_PROFILE_DATA, this.gdHandler.userProfile);
        this.log.success(this.sharedService.getTransData('LOGIN.SUCCESSFULLY_AUTHORIZED_WITH_USERNAME')
          + ' ' + this.gdHandler.userProfile.firstName + '!',
          this.sharedService.getTransData('LOGIN.SUCCESSFULLY_AUTHORIZED'));
        this.isLoginInitiated = false;
        this.navigateUserByRole();
      } else {
        this.isLoginInitiated = false;
        this.log.error(data.message);
      }
    },
      (err: HttpErrorResponse) => {
        this.log.error(err.message);
        this.isLoginInitiated = false;
      });
  }

  navigateUserByRole(): void {
    this.router.navigate(['/dashboard']);
  }

  changeLanguage(localeName) {
    this.commonAppService.switchLanguage(localeName);
  }
}
