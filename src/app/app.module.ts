import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Inject, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatIconRegistry,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatLineModule,
  MatInputModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSelectModule,
  MatCommonModule,
  MatTabsModule,
  MatSortModule,
  MatSliderModule,
  MatStepperModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { GlobalDataHandler } from './common/class/global-data-handler';
import { LoginComponent } from './common/components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FourZeroFourComponent } from './common/components/four-zero-four/four-zero-four.component';
import { L10nConfig, L10nLoader, TranslationModule, StorageStrategy, ProviderType, ISOCode } from 'angular-l10n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { NoNetworkComponent } from './common/components/no-network/no-network.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { WebStorageModule } from 'ngx-store';
import { ConfirmDialogComponent } from './common/components/dialog/confirm-dialog/confirm-dialog.component';
import { ImageLightBoxComponent } from './common/components/dialog/image-light-box/image-light-box.component';
import { CountoModule } from 'angular2-counto';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { TeacherInfoComponent } from './userInfo/components/teacher-info/teacher-info.component';
import { IndividualTeacherInfoComponent } from './userInfo/dialogs/individual-teacher-info/individual-teacher-info.component';
import { ViewEditTeacherInfoComponent } from './userInfo/components/view-edit-teacher-info/view-edit-teacher-info.component';
import { AuthInterceptor } from './auth/interceptor/auth-interceptor';
// import { httpInterceptorProviders } from './auth/interceptor';

const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'hn', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'en', countryCode: 'US' },
    currency: 'USD',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: './assets/i18n/locale-' }
    ],
    composedLanguage: [ISOCode.Language],
    caching: true,
    missingValue: 'No key',
    composedKeySeparator: '.'
  }
};

// Advanced initialization.
export function initL10n(l10nLoader: L10nLoader): Function {
  return () => l10nLoader.load();
}

// APP_INITIALIZER will execute the function when the app is initialized and delay what it provides.
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FourZeroFourComponent,
    NoNetworkComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    ImageLightBoxComponent,
    ForgotPasswordComponent,
    TeacherInfoComponent,
    IndividualTeacherInfoComponent,
    ViewEditTeacherInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslationModule.forRoot(l10nConfig),
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatLineModule,
    MatDividerModule,
    ToastyModule.forRoot(),
    WebStorageModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CountoModule,
    MatTooltipModule,
    MatSelectModule,
    MatCommonModule,
    MatSortModule,
    MatTabsModule,
    MatSliderModule,
    MatStepperModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ImageLightBoxComponent,
    IndividualTeacherInfoComponent
  ],
  providers: [
    GlobalDataHandler,
    {
      provide: APP_INITIALIZER,
      useFactory: initL10n,
      deps: [L10nLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    @Inject(OverlayContainer) private overlayContainer: OverlayContainer,
    @Inject(MatIconRegistry) matIconRegistry: MatIconRegistry,
    @Inject(DomSanitizer) domSanitizer: DomSanitizer,
  ) {
    this.overlayContainer
      .getContainerElement()
      .classList.add('bconnect-dark-theme');
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg')
    );
  }
}
