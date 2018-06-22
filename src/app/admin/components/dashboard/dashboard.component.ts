import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonAppService } from '../../../common/services/common-app.service';
import { GlobalDataHandler } from '../../../common/class/global-data-handler';
import { Constants } from '../../../common/class/constants';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

//
// ─── DASHBOARD COMPONENT STARTED ────────────────────────────────────────────────
//


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class DashboardComponent implements OnInit {
  public isMobileView: boolean;
  watcher: Subscription;
  dashboardData = [
    {
      id: 0,
      icon: 'forum',
      name: 'View &amp; Respond',
      link: '/somewhere',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 1,
      icon: 'home-modern',
      name: 'School Channel',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 2,
      icon: 'teach',
      name: 'Class Channel',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 3,
      icon: 'calendar-clock',
      name: 'Appointment',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 4,
      icon: 'star',
      name: 'Grade',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 5,
      icon: 'calendar-multiple',
      name: 'Academic Year',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 6,
      icon: 'account',
      name: 'Student',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 7,
      icon: 'teach',
      name: 'Teacher',
      link: 'userinfo/teacherinfo',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 8,
      icon: 'teach',
      name: 'Staff',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 9,
      icon: 'car',
      name: 'Driver',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 10,
      icon: 'map-marker-radius',
      name: 'Route',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    },
    {
      id: 11,
      icon: 'map-marker-distance',
      name: 'Active Route',
      link: 'viewRespond',
      flip: 'inactive',
      info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
        'Ex itaque possimus nostrum voluptates laudantium, totam laborum sunt consectetur saepe expedita facilis.' +
        'Deserunt, fugiat. Aut unde recusandae pariatur saepe neque. Nam.'
    }
  ];
  //
  // ─── DEFAULT CONSTRUCTOR ────────────────────────────────────────────────────────
  //

  constructor(
    private commonAppService: CommonAppService,
    private gdHandler: GlobalDataHandler,
    private cookiesStorageService: CookiesStorageService,
    private localStorageService: LocalStorageService,
    private media: ObservableMedia,
    private renderer2: Renderer2,
    private router: Router
  ) {
    this.initialize();
  }

  ngOnInit() {
    this.isMobileView = this.media.isActive('xs');

    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = change.mqAlias === 'xs';
    });
  }
  /**
   * initialize the component and start prime activities
   */
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

  toggleFlip(dbObj) {
    this.dashboardData[this.dashboardData.indexOf(dbObj)].flip =
      (this.dashboardData[this.dashboardData.indexOf(dbObj)].flip === 'inactive') ? 'active' : 'inactive';
  }

  matElevationAdd(ev: Event) {
    this.renderer2.addClass(ev.target, 'mat-elevation-z6');
  }

  matElevationRemove(ev: Event) {
    this.renderer2.removeClass(ev.target, 'mat-elevation-z6');
  }

  redirectTo(dashboardObj: any) {
    this.router.navigate([dashboardObj.link]);
  }

}
