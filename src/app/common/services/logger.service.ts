import { Injectable, Inject } from '@angular/core';
import { Constants } from '../class/constants';
import { environment } from '../../../environments/environment';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public isProdMode: boolean = environment.production;
  private toastOptions: ToastOptions;

  constructor(
    @Inject(ToastyService) private toastyService: ToastyService,
    @Inject(ToastyConfig) private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = 'top-right';
    this.toastyConfig.theme = 'default';
  }

  /** Log desc with the LogHandlerService
   * @param title -Title
   * @param desc  - description
   */
  public log(title: string, desc: any, obj?: any) {
    if (!this.isProdMode) {
      console.log('[ ' + title + ' ]: ' + desc + ' ' + obj ? JSON.stringify(obj) : '');
    }
  }

  /** Show error toast
   * @param title -Title of desc
   * @param desc - Body or description of desc
   */
  public error(title: string, desc?: string) {
    this.toastInit(title, desc || '');
    this.toastyService.error(this.toastOptions);
  }

  /** Show info toast
   * @param title -Title of desc
   * @param desc - Body or description of desc
   */
  public info(title: string, desc?: string) {
    this.toastInit(title, desc || '');
    this.toastyService.info(this.toastOptions);
  }

  /** Show success toast
   * @param title -Title of desc
   * @param desc - Body or description of desc
   */
  public success(title: string, desc?: string) {
    this.toastInit(title, desc || '');
    this.toastyService.success(this.toastOptions);
  }

  /** Show Wait toast
   * @param title -Title of desc
   * @param desc - Body or description of desc
   */
  public wait(title: string, desc: string) {
    this.toastInit(title, desc);
    this.toastyService.wait(this.toastOptions);
  }

  /** Show warning toast
   * @param title -Title of desc
   * @param desc - Body or description of desc
   */
  public warning(title: string, desc: string) {
    this.toastInit(title, desc);
    this.toastyService.warning(this.toastOptions);
  }

  toastInit(title: string, msg: string) {
    this.toastOptions = {
      title: title,
      msg: msg,
      showClose: Constants.TOAST_CONFIG.SHOW_CLOSE,
      timeout: Constants.TOAST_CONFIG.TIMEOUT,
      theme: Constants.TOAST_CONFIG.THEME,
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
  }
}
