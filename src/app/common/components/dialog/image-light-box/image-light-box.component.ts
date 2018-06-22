import { MatDialogRef } from '@angular/material';
import { Inject } from '@angular/core';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-image-light-box',
  templateUrl: './image-light-box.component.html',
  styleUrls: ['./image-light-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageLightBoxComponent implements OnInit {
  public imgSrc: string;
  public imgTitle: string;

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<ImageLightBoxComponent>
  ) {}

  ngOnInit() {}
}
