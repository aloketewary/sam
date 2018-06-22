import { Component, OnInit, Inject } from '@angular/core';
import { Language } from 'angular-l10n';
import { FormErrorStateMatcher } from '../../../common/class/form-error-state-matcher';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../../common/class/user';
import { GlobalDataHandler } from '../../../common/class/global-data-handler';
import { CommonAppService } from '../../../common/services/common-app.service';
import { Router } from '@angular/router';
import { LoggerService } from '../../../common/services/logger.service';
import { SharedService } from '../../../common/services/shared.service';
import { AuthService } from '../../services/auth.service';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
import { Constants } from '../../../common/class/constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Language() lang: string;
  errorCode: string;
  matcher: FormErrorStateMatcher;
  forgotPwdForm: FormGroup;
  user: User;
  isForgotPwdWorkStart: boolean;

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
  }

  ngOnInit() {
    this.errorCode = '501';
    this.initForms();
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
    this.forgotPwdForm = this._formBuilder.group({
      emailField: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      )
    });
  }

  navigateUserByRole(): void {
    this.router.navigate(['/dashboard']);
  }

  onForgotPasswordBtnSubmit() {
    this.isForgotPwdWorkStart = true;
    this.authService.forgotPassword(this.user.email).subscribe((data: any) => {
      this.log.success(this.sharedService.getTransData('LOGIN.FORGOT_SUCCESSFULL_MSG'));
      this.isForgotPwdWorkStart = false;
    },
      (err: HttpErrorResponse) => {
        this.log.error(err.message);
        this.isForgotPwdWorkStart = false;
      });
  }
}
