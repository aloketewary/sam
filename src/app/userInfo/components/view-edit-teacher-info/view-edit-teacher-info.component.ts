import { Component, OnInit, Inject } from '@angular/core';
import { CommonAppService } from '../../../common/services/common-app.service';
import { GlobalDataHandler } from '../../../common/class/global-data-handler';
import { LocalStorageService, CookiesStorageService } from 'ngx-store';
import { UserInfoService } from '../../services/user-info.service';
import { LoggerService } from '../../../common/services/logger.service';
import { UserInfoDialogService } from '../../services/user-info-dialog.service';
import { Constants } from '../../../common/class/constants';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../common/class/user';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserProfile } from '../../../common/class/user-profile';
import { UserProfileFullData } from '../../classes/user-profile-full-data';

@Component({
  selector: 'app-view-edit-teacher-info',
  templateUrl: './view-edit-teacher-info.component.html',
  styleUrls: ['./view-edit-teacher-info.component.scss']
})
export class ViewEditTeacherInfoComponent implements OnInit {

  private className = 'ViewEditTeacherInfoComponent';
  private user: User;
  private userProfileFullData: UserProfileFullData;
  private userSchoolId: number;
  isLinear = false;
  editViewPersonalForm: FormGroup;
  isEditable: boolean;
  public selectedFiles: FileList;
  public selectedFile = '';

  constructor(
    @Inject(CommonAppService) private commonAppService: CommonAppService,
    @Inject(GlobalDataHandler) private gdHandler: GlobalDataHandler,
    @Inject(LocalStorageService) private localStorageService: LocalStorageService,
    @Inject(CookiesStorageService) private cookiesStorageService: CookiesStorageService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
    @Inject(LoggerService) private log: LoggerService,
    @Inject(UserInfoDialogService) private userInfoDialogService: UserInfoDialogService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(Location) private location: Location,
    @Inject(FormBuilder) private _formBuilder: FormBuilder
  ) {
    this.initialize();
    this.user = new User();
    this.userProfileFullData = new UserProfileFullData();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.user.email = params['maildId'];
      if (this.commonAppService.isNullOrUndefined(this.user.email)) {
        this.goBack();
      } else {
        this.getUserInfoFromServer(this.user.email, params['schoolId']);
      }
    });
    this.createForm();
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

  goBack(): void {
    this.location.back();
  }

  getUserInfoFromServer(emailId: string, schoolId: number) {
    this.userInfoService.getUserInfo(emailId, schoolId).subscribe((data) => {
      this.userProfileFullData = {
        'lastName': 'supriya',
        'role': '',
        'notes': {
          'transportationCounselor': '',
          'schoolCounselor': ''
        },
        'gender': 'Female',
        'emailId': 'info@wayofschooling.com',
        'joiningDate': new Date(),
        'phoneNo': '(+1)556699885533',
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
        'password': 'wosteacher',
        'isDeleted': false,
        'countryCode': null,
        'schoolId': 101,
        'staffPin': 117698,
        'deviceTokenId': 'fiPb2ET9tbM:APA91bEQDblbn9jr0kOC5QAVxaXz_AjDXmwErTHYCynUj9xrphwOPL4_d617B-GqNv-FTqFUO7FW69ghdPupY7rpeNy5tCrI5xsCy5Ev5SWeTpJwnfqxCJxwPjAvSL0BO20u7qwBwiHE',
        'id': 'info@wayofschooling.com',
        'department': '',
        'qualificationDetails': {},
        'address': 'navsari gujrat',
        'profilePic': '/schoolapp/images/e540e873-d773-4f64-938e-2e5c7bed06f5.jpeg',
        'geopoint': '26.437201,80.284257',
        'pickPoint': 'Community Point',
        'physicianDetails': {
          'firstName': '',
          'lastName': '',
          'country': null,
          'address': '',
          'city': null,
          'phone': '',
          'state': null,
          'fax': '',
          'email': null
        },
        'requiresTransportation': true,
        'firstName': 'Anvi',
        'createdDate': new Date('2018-05-24'),
        'dob': new Date('2016-08-27'),
        'modifiedDate': new Date('2018-06-17'),
        'experienceDetails': {},
        'files': [],
        'emergencyDetails': {
          'firstName': '',
          'lastName': '',
          'education': null,
          'occupation': null,
          'address': '',
          'dob': null,
          'emailId': '',
          'phoneNo': '',
          'relation': ''
        },
        'position': null,
        'userType': 'teacher',
        'maritalStatus': 'single'
      };
    });
  }

  createForm(): void {
    this.editViewPersonalForm = this._formBuilder.group({
      firstName: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      ),
      lastName: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      )
    });
  }

  getProfilePicUrl(url: string): string {
    return Constants.MAIN_ROOT_URL + url;
  }
}
