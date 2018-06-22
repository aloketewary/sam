import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-individual-teacher-info',
  templateUrl: './individual-teacher-info.component.html',
  styleUrls: ['./individual-teacher-info.component.scss']
})
export class IndividualTeacherInfoComponent implements OnInit {
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
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<IndividualTeacherInfoComponent>
  ) { }

  ngOnInit() {
  }

}
