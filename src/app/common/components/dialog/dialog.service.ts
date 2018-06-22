import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './../../../common/services/shared.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ImageLightBoxComponent } from './image-light-box/image-light-box.component';
import { LoggerService } from '../../services/logger.service';
import { GlobalDataHandler } from '../../class/global-data-handler';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  protected className = 'DialogService';
  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(ObservableMedia) private observableMedia: ObservableMedia,
    @Inject(LoggerService) private logHandler: LoggerService,
    @Inject(HttpClient) private http: HttpClient,
    @Inject(GlobalDataHandler) private gdHandler: GlobalDataHandler,
    @Inject(SharedService) private sharedService: SharedService
  ) {}

  /*
  * Themes are : info / success/ warning / error
  */
  public confirm(
    title: string,
    message?: string,
    svgIconName?: string,
    theme?: string,
    okButtonName?: string,
    cancelButtonName?: string
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
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

  public alert(
    title: string,
    message?: string,
    svgIconName?: string,
    theme?: string,
    okButtonName?: string
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message || '';
    dialogRef.componentInstance.svgIconName = svgIconName || '';
    dialogRef.componentInstance.ok_button = okButtonName || 'OK';
    dialogRef.componentInstance.isAlert = true;
    dialogRef.componentInstance.theme = theme || 'info';
    return dialogRef.afterClosed();
  }

  public viewFullScreenImage(
    imageSrc: string,
    imageTitle: string,
  ): Observable<boolean> {
    let dialogRef: MatDialogRef<ImageLightBoxComponent>;
    dialogRef = this.dialog.open(ImageLightBoxComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.imgSrc = imageSrc;
    dialogRef.componentInstance.imgTitle = imageTitle || '';
    return dialogRef.afterClosed();
  }
}
