import { Inject, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public svgIconName: string;
  public ok_button: string;
  public cancel_button: string;
  public theme: string;
  public isAlert: boolean;
  messageList: string[];
  backToCssNormal: boolean;

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
    if (this.message) {
      this.messageList = this.message.split('^');
    }
  }
}
