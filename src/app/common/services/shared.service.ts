import { Injectable, Inject } from '@angular/core';
import { TranslationService } from 'angular-l10n';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    @Inject(TranslationService) public translation: TranslationService
  ) { }

  /** To get translated data for error services
  *  to better understanding for user
  * @param keys - Translate KEY
  * @param args - Arguments optional
  * @param lang - optional lang param
  */
  getTransData(keys: string | string[], args?: any, lang?: string): string {
    return this.translation.translate(keys, args, lang);
  }
}
