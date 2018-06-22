import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataHandler } from '../../class/global-data-handler';

@Component({
  selector: 'app-four-zero-four',
  templateUrl: './four-zero-four.component.html',
  styleUrls: ['./four-zero-four.component.scss']
})
export class FourZeroFourComponent implements OnInit {
  private TAG = 'FourZeroFourComponent';
  @Input() errorCode: string;
  @Input() errorMessage: string;
  constructor(
    private router: Router,
    private gdHandler: GlobalDataHandler
  ) {
    this.initialize();
  }

  ngOnInit() {
  }

  initialize(): void {
    this.errorCode = this.errorCode || '404';
    this.errorMessage = this.errorMessage || 'Oops! Something is wrong.';
  }

  navigateTo(): void {
    this.router.navigate([this.gdHandler.rootURL]);
  }
}
