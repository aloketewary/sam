import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../common/class/constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
import { GlobalDataHandler } from '../../common/class/global-data-handler';
import { UserProfile } from '../../common/class/user-profile';
import { of } from 'rxjs';
import { LoggerService } from '../../common/services/logger.service';
import { catchError, map, tap } from 'rxjs/operators';
import { TeacherData } from '../../userInfo/classes/teacher-data';
//
// ─── AUTHENTICATION SERVICE ─────────────────────────────────────────────────────
//

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  className = 'AuthService';
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private cookiesStorageService: CookiesStorageService,
    private localStorageService: LocalStorageService,
    private gdHandler: GlobalDataHandler,
    private logger: LoggerService
  ) { }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    return !!this.cookiesStorageService.get(Constants.LOGIN_PERSISTENCE_NAME);
  }

  /**
  * Log out the user then tell all the subscribers about the new status
  */
  logout(): void {
    this.cookiesStorageService.remove(Constants.LOGIN_PERSISTENCE_NAME);
    this.gdHandler.userProfile = new UserProfile();
    this.gdHandler.currentUserRole = '';
    this.isLoginSubject.next(false);
  }

  /**
* Check for isLoggedIn
* @returns {Observable<T>}
*/
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  // /**
  //  * @returns {customData}
  //  */
  // userAuthentication(userName: string, password: string) {
  //   const data = {
  //     'emailId': userName,
  //     'newPassword': 'string',
  //     'password': password
  //   };
  //   const reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'AuthToken': '16021987',
  //     'No-Auth': 'True'
  //   });
  //   return this.http.post(Constants.ROOT_URL + Constants.LOGIN_URL, data, { headers: reqHeader });
  // }

  /**
   * This useed for forgot password for specific username/id/emailid
   * @param userName as string
   * @returns {customData}
   */
  forgotPassword(userName: string) {
    const data = {
      'emailId': userName,
      'newPassword': 'string',
      'password': 'string'
    };
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'AuthToken': '16021987',
      'No-Auth': 'True'
    });
    return this.http.post(Constants.ROOT_URL + Constants.FORGOT_PASSWORD_URL, data, { headers: reqHeader });

  }

  getAuthorizationToken() {
    return '16021987';
  }

  userAuthentication<Data>(userName: string, password: string): Observable<TeacherData[]> {
    const url = Constants.ROOT_URL + Constants.LOGIN_URL;
    const targetData = {
      'emailId': userName,
      'password': password
    };
    return this.http.post<TeacherData[]>(url, targetData, httpOptions).pipe(
      tap((teacher: TeacherData[]) => this.logger.log(this.className, `teaacher logged in successfull`)),
      catchError(this.handleError<TeacherData[]>('addNewTarget')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.error(this.className, `${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
