import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { GlobalDataHandler } from './common/class/global-data-handler';
import { Constants } from './common/class/constants';
import { TranslationService } from 'angular-l10n';
import { SharedService } from './common/services/shared.service';
import { LoggerService } from './common/services/logger.service';
import { DialogService } from './common/components/dialog/dialog.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private className = 'AppComponent';
  public loading = true;
  toastyComponentPosition: string;
  public isMobileView: boolean;
  watcher: Subscription;
  menuState: boolean;
  @ViewChild('sidenav') menuSidenav: MatSidenav;
  public onlineOffline: Observable<boolean>;
  links = [
    // ------ From here Admin Menu Started -------
    {
      icon: 'comment-multiple-outline',
      name: 'Communications',
      isShow: false,
      userRole: Constants.ROLE_STAFF,
      href: 'viewRespond',
      isChildAvailable: true,
      child: [
        {
          icon: 'forum',
          name: 'View & Respond',
          href: 'viewRespond'
        },
        {
          icon: 'home-modern',
          name: 'School Channel',
          href: 'viewRespond'
        },
        {
          icon: 'teach',
          name: 'Class Channel',
          href: 'viewRespond'
        },
        {
          icon: 'calendar-clock',
          name: 'Appointment',
          href: 'viewRespond'
        }
      ]
    },
    {
      icon: 'book-open-page-variant',
      name: 'Class Schedules Info',
      isShow: false,
      userRole: Constants.ROLE_STAFF,
      href: 'viewRespond',
      isChildAvailable: true,
      child: [
        {
          icon: 'star',
          name: 'Grade',
          href: 'viewRespond'
        },
        {
          icon: 'calendar-multiple',
          name: 'Academic Year',
          href: 'viewRespond'
        },
        {
          icon: 'calendar-text',
          name: 'Class Events',
          href: 'viewRespond'
        },
        {
          icon: 'calendar-range',
          name: 'School Events',
          href: 'viewRespond'
        }
      ]
    },
    {
      icon: 'contacts',
      name: 'Admission /On Board',
      isShow: false,
      userRole: Constants.ROLE_STAFF,
      href: 'viewRespond',
      isChildAvailable: true,
      child: [
        {
          icon: 'account',
          name: 'Student',
          href: 'viewRespond'
        },
        {
          icon: 'teach',
          name: 'Teacher',
          href: 'viewRespond'
        },
        {
          icon: 'teach',
          name: 'Staff',
          href: 'viewRespond'
        },
        {
          icon: 'car',
          name: 'Driver',
          href: 'viewRespond'
        }
      ]
    },
    {
      icon: 'information',
      name: 'User Info',
      isShow: false,
      userRole: Constants.ROLE_STAFF,
      href: 'userinfo',
      isChildAvailable: true,
      child: [
        {
          icon: 'account',
          name: 'Student',
          href: 'viewRespond'
        },
        {
          icon: 'teach',
          name: 'Teacher',
          href: 'userinfo/teacherinfo'
        },
        {
          icon: 'teach',
          name: 'Staff',
          href: 'viewRespond'
        },
        {
          icon: 'car',
          name: 'Driver',
          href: 'viewRespond'
        }
      ]
    },
    {
      icon: 'subway-variant',
      name: 'Transportation',
      isShow: false,
      userRole: Constants.ROLE_STAFF,
      href: 'viewRespond',
      isChildAvailable: true,
      child: [
        {
          icon: 'map-marker-radius',
          name: 'Route',
          href: 'viewRespond'
        },
        {
          icon: 'map-marker-distance',
          name: 'Active Route',
          href: 'viewRespond'
        }
      ]
    }
  ];

  constructor(
    public gdHandler: GlobalDataHandler,
    private media: ObservableMedia,
    @Inject(SharedService) public sharedService: SharedService,
    private _logHandler: LoggerService,
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router
  ) {
    this.onlineOffline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.gdHandler.projectName = this.sharedService.getTransData('APP.PROJECT_NAME');
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.toastyComponentPosition = Constants.TOAST_CONFIG.POSITION;
    this.isMobileView = this.media.isActive('xs') || this.media.isActive('sm');

    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.watcher.unsubscribe();
  }

  showHideNavMenu(link) {
    this.links.forEach(indLink => {
      if (indLink.name !== link.name) {
        indLink.isShow = false;
      }
    });
    this.links[this.links.indexOf(link)].isShow = !this.links[this.links.indexOf(link)].isShow;
  }

  /**
   * Remove logout
   */
  logoutDialog() {
    /* Confirm dialog passed optional parameters for better data handle*/
    this.dialogService
      .confirm('Logout', 'Are sure you want to logout?', 'logout', 'info', 'LOGOUT', 'CANCEL')
      .subscribe(res => {
        try {
          if (res) {
            this.onLoggedOut();
            this._logHandler.success('Logout Successfully', '');
          }
        } catch (error) {
          this._logHandler.log(this.className, error);
          this._logHandler.error('Logout Error');
        }
      });
  }

  onLoggedOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserProfilePic(url: string): string {
    return Constants.MAIN_ROOT_URL + url;
  }

  routeIsActive(routePath: string) {
    const mainUrl = this.router.url;
    const splitUrls = mainUrl.split('/');
    return splitUrls[1] === routePath;
  }
}
