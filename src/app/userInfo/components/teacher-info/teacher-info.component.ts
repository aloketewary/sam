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
          // FIXME: Please delete below line after url fixed
          // this.log.error(this.className, data.message);
          this.teacherList = [
            {
              'userpermissions': {
                'teachermodules': {
                  'homework': true,
                  't2t': true,
                  'appointment': true,
                  'login': true,
                  'communication': true,
                  'attendance': true
                },
                'adminmodules': {
                  'route': true,
                  'driver': true,
                  'student': true,
                  'fee': true,
                  'channel': true,
                  'appointment': true,
                  'staff': true,
                  'login': true,
                  'communication': true,
                  'events': true
                },
                'drivermodules': {
                  'login': true
                }
              },
              'lastName': 'Rocks',
              'firstName': 'Teacher R ',
              'role': 'History Teacher',
              'gender': 'male',
              'schoolId': 101,
              'profilePic': '/schoolapp/images/6bf009fc-d4ff-473f-9500-8f664b9aecce.png',
              'emailId': 'hfgfgfhfhh@gmail.com',
              'deviceTokenId': '',
              'userType': 'teacher',
              'id': 'hfgfgfhfhh@gmail.com',
              'phoneNo': '(+1)6565565656566'
            },
            {
              'lastName': 'One',
              'role': 'admin',
              'gender': 'Male',
              'qrcode': null,
              'profilePic': '/schoolapp/images/6c98e1f5-a8e1-42ae-b7e0-18beace82e74.png',
              'emailId': 'wayofschooling@gmail.com',
              'phoneNo': 'e434333553413',
              'userpermissions': {
                'teachermodules': {
                  'homework': true,
                  't2t': true,
                  'appointment': true,
                  'login': true,
                  'communication': true,
                  'attendance': true
                },
                'adminmodules': {
                  'route': true,
                  'driver': true,
                  'student': true,
                  'fee': true,
                  'channel': true,
                  'appointment': true,
                  'staff': true,
                  'login': true,
                  'communication': true,
                  'events': true
                },
                'drivermodules': {
                  'login': true
                }
              },
              'firstName': 'Admin',
              'schoolId': 101,
              'deviceTokenId': 'cPB5GZr64tI:APA91bFBSUFgMDX060r5UIPOwQQT-nWnBqcYr_2zLi_' +
                'bdRKKFW8a-DX3i85u8kLXRmhieHw1SkEbejbyEbLiibeqYvxtzPqDCXRFpGGDLWnyY0EZUvHdalAa - Ryq9gj8pq2JTqAl2w1uNi4U0YjxkVOydPUt3vWfPA',
              'userType': 'staff',
              'id': 'wayofschooling@gmail.com'
            },
            {
              'userpermissions': {
                'teachermodules': {
                  'homework': true,
                  't2t': true,
                  'appointment': true,
                  'login': true,
                  'communication': true,
                  'attendance': true
                },
                'adminmodules': {
                  'route': true,
                  'driver': true,
                  'student': true,
                  'fee': true,
                  'channel': true,
                  'appointment': true,
                  'staff': true,
                  'login': true,
                  'communication': true,
                  'events': true
                },
                'drivermodules': {
                  'login': true
                }
              },
              'lastName': 'supriya',
              'firstName': 'Anvi',
              'role': '',
              'gender': 'Female',
              'schoolId': 101,
              'profilePic': '/schoolapp/images/e540e873-d773-4f64-938e-2e5c7bed06f5.jpeg',
              'emailId': 'info@wayofschooling.com',
              'deviceTokenId': 'fiPb2ET9tbM:APA91bEQDblbn9jr0kOC5QAVxaXz_AjDXmwErTHYCynUj' +
                '9xrphwOPL4_d617B-GqNv-FTqFUO7FW69ghdPupY7rpeNy5tCrI5xsCy5Ev5SWeTpJwnfqxCJxwPjAvSL0BO20u7qwBwiHE',
              'userType': 'teacher',
              'id': 'info@wayofschooling.com',
              'phoneNo': '(+1)556699885533'
            },
            {
              'userpermissions': {
                'teachermodules': {
                  'homework': true,
                  't2t': true,
                  'appointment': true,
                  'login': true,
                  'communication': true,
                  'attendance': true
                },
                'adminmodules': {
                  'route': true,
                  'driver': true,
                  'student': true,
                  'fee': true,
                  'channel': true,
                  'appointment': true,
                  'staff': true,
                  'login': true,
                  'communication': true,
                  'events': true
                },
                'drivermodules': {
                  'login': true
                }
              },
              'lastName': 'enenennene',
              'firstName': 'bdndejej',
              'role': '',
              'gender': 'male',
              'schoolId': 101,
              'profilePic': '/schoolapp/images/9a05cc03-b89d-43c8-a75d-61dad3efc561.png',
              'emailId': 'infoo@wayofschooling.com',
              'deviceTokenId': '',
              'userType': 'staff',
              'id': 'infoo@wayofschooling.com',
              'phoneNo': '(+91)65656565656'
            }
          ];
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
