import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Language } from 'angular-l10n';

@Component({
  selector: 'app-no-network',
  templateUrl: './no-network.component.html',
  styleUrls: ['./no-network.component.scss']
})
export class NoNetworkComponent implements OnInit {
  @Language() lang;
  constructor(
  ) { }

  ngOnInit() {
  }

//   typescript import { NgForageModule, NgForageConfig } from 'ngforage';
// @NgModule({
//   imports: [
//     // Optional in Angular 6 and up NgForageModule.forRoot(),
//     // Optional configuration as an alternative to what's below in Angular 6+ 
//     NgForageModule.forRoot({
//       name: 'MyApp',
//       driver: [
//         // defaults to indexedDB -> webSQL -> localStorage -> sessionStorage 
//         NgForageConfig.DRIVER_INDEXEDDB, NgForageConfig.DRIVER_LOCALSTORAGE]
//     })]
// })
// export class AppModule {
//   public constructor(ngfConfig: NgForageConfig) {
//     ngfConfig.configure({
//       name: 'MyApp', driver: [
//         // defaults to indexedDB -> webSQL -> localStorage -> sessionStorage
//         NgForageConfig.DRIVER_INDEXEDDB, NgForageConfig.DRIVER_LOCALSTORAGE]
//     });
//   }
// }
// import { NgForage, NgForageCache, NgForageConfig, CachedItem } from 'ngforage';
// @Component({
//   /* If you plan on making per-component config adjustments, add the services to the component's providers * to receive fresh instances; otherwise, skip the providers section. */
//   providers: [NgForage, NgForageCache]
// })
// class SomeComponent implements OnInit {
//   constructor(private readonly ngf: NgForage, private readonly cache: NgForageCache) { }
//   public getItem<T = any>(key: string): Promise<T> {
//     return this.ngf.getItem<T>(key);
//   }
//   public getCachedItem<T = any>(key: string): Promise<T | null> {
//     return this.cache.getCached<T>(key).then((r: CachedItem<T>) => {
//       if (!r.hasData || r.expired) {
//         return null;
//       } return r.data;
//     })
//   } public ngOnInit() {
//     this.ngf.name = 'SomeStore';
//     this.cache.driver = NgForageConfig.DRIVER_SESSIONSTORAGE;
//   }
// }

}
