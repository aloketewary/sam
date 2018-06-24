import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonAppService } from '../../../common/services/common-app.service';
import { GlobalDataHandler } from '../../../common/class/global-data-handler';
import { Constants } from '../../../common/class/constants';
import { LocalStorageService, CookiesStorageService } from 'ngx-store';
import { TeacherData } from '../../classes/teacher-data';
import { UserInfoService } from '../../services/user-info.service';
import { LoggerService } from '../../../common/services/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Language } from 'angular-l10n';
import { UserInfoDialogService } from '../../services/user-info-dialog.service';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {
  private className = 'TeacherInfoComponent';
  @Language() lang;
  teacherList: Array<TeacherData>;
  loadingData: boolean;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  selectedTeacher: TeacherData;
  constructor(
    @Inject(CommonAppService) private commonAppService: CommonAppService,
    @Inject(GlobalDataHandler) private gdHandler: GlobalDataHandler,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
    @Inject(CookiesStorageService) private cookiesStorageService: CookiesStorageService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
    @Inject(LoggerService) private log: LoggerService,
    @Inject(UserInfoDialogService) private userInfoDialogService: UserInfoDialogService,
    @Inject(Router) private router: Router,
  ) {
    this.initialize();
  }

  ngOnInit() {
    this.getTeacherList();
    this.selectedTeacher = new TeacherData();
    this.teacherList = [];
  }

  initialize(): void {
    this.commonAppService.checkForLoggedInUser().subscribe(res => {
      if (res) {
        this.gdHandler.isLogin = true;
        this.gdHandler.userProfile = this.localStorageService.get(Constants.USER_PROFILE_DATA);
        this.gdHandler.currentUserRole = this.gdHandler.userProfile.userType;
        // this.navigateUserByRole();
      }
    });
  }

  getTeacherList(): void {
    this.loadingData = true;
    this.userInfoService.getTeachers(this.gdHandler.userProfile.schoolId).subscribe((data: any) => {
      try {
        if (data.result != null && data.result.length > 0) {
          this.cookiesStorageService.set(Constants.LOGIN_PERSISTENCE_NAME, data.authtoken,
            this.commonAppService.getCalculatedAuthTokenExpires(data.authtokenexpires));
          this.teacherList = data.result;
          this.loadingData = false;
        } else {
          this.loadingData = false;
        }
      } catch (error) {
        this.log.error(this.className, error.message);
      }
    },
      (err: HttpErrorResponse) => {
        this.log.error(this.className, err.message);
        this.loadingData = false;
      });
  }

  getImgUrl(dynamicUrl: string): string {
    return Constants.MAIN_ROOT_URL + dynamicUrl;
  }

  gotoIndividualTeacherDetails(): void {
    this.router.navigate([`userinfo/vieweditteacherinfo/${this.selectedTeacher.emailId}/${this.selectedTeacher.schoolId}`]);
  }
}
