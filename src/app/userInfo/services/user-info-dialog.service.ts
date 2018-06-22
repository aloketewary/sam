import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { LoggerService } from '../../common/services/logger.service';
import { HttpClient } from '@angular/common/http';
import { GlobalDataHandler } from '../../common/class/global-data-handler';
import { SharedService } from '../../common/services/shared.service';
import { Observable } from 'rxjs';
import { IndividualTeacherInfoComponent } from '../dialogs/individual-teacher-info/individual-teacher-info.component';

@Injectable({
  providedIn: 'root'
})
export class UserInfoDialogService {

  protected className = 'UserInfoDialogService';
  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(ObservableMedia) private observableMedia: ObservableMedia,
    @Inject(LoggerService) private logger: LoggerService,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(GlobalDataHandler) private gdHandler: GlobalDataHandler,
    @Inject(SharedService) private sharedService: SharedService,
  ) { }

  /*
  * Themes are : info / success/ warning / error
  */
  public displayTeacherData(
    title: string,
    message?: string,
    svgIconName?: string,
    theme?: string,
    okButtonName?: string,
    cancelButtonName?: string
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<IndividualTeacherInfoComponent>;
    dialogRef = this.dialog.open(IndividualTeacherInfoComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message || '';
    dialogRef.componentInstance.svgIconName = svgIconName || '';
    dialogRef.componentInstance.ok_button = okButtonName || this.sharedService.getTransData('OK_BUTTON');
    dialogRef.componentInstance.cancel_button = cancelButtonName || this.sharedService.getTransData('CANCEL_BUTTON');
    dialogRef.componentInstance.theme = theme || 'info';
    return dialogRef.afterClosed();
  }
}
