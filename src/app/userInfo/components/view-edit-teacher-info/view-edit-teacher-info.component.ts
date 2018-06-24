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
  maxAllowedDateForDOB = new Date();
  minAllowedDateForDOB = new Date(1900, 1, 1);
  map: MapConfig;

  constructor(
    @Inject(CommonAppService) public commonAppService: CommonAppService,
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
    this.map = new MapConfig();
    this.map.zoom = Constants.MAP_ZOOM_LEVEL;
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

  getUserInfoFromServer(emailId: string, schoolId?: number) {
    this.userInfoService.getUserInfo(emailId, schoolId).subscribe((data) => {
      this.userProfileFullData = data.result;
      this.map.lat = this.userProfileFullData.geopoint.split(',')[0];
      this.map.lng = this.userProfileFullData.geopoint.split(',')[1];
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
      ),
      dob: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      ),
      emailField: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required, Validators.email])
      ),
      gender: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      ),
      phone: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      ),
      joiningDate: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([])
      ),
      position: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([])
      ),
      address: new FormControl(
        { value: '', disabled: this.isEditable },
        Validators.compose([Validators.required])
      ),
    });
  }

  getProfilePicUrl(url: string): string {
    return Constants.MAIN_ROOT_URL + url;
  }
}


class MapConfig {
  lat: any;
  lng: any;
  zoom: number;
}
