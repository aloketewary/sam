import { Injectable } from '@angular/core';
import { Constants } from '../../common/class/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TeacherInfoComponent } from '../components/teacher-info/teacher-info.component';
import { TeacherData } from '../classes/teacher-data';
import { Observable, of } from 'rxjs';
import { HandleError, HttpErrorHandler } from '../../common/services/http-error-handler.service';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs-compat/operator/map';
import { LoggerService } from '../../common/services/logger.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'AuthToken': '16021987'
  })
};
// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'AuthToken': '16021987', })
// };


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  className = 'UserInfoService';
  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {
  }

  // /**
  //  * @returns {customData}
  //  */
  // teacherDataList(schoolId: number) {
  //   return this.http.get(Constants.ROOT_URL + Constants.TEACHER_LIST_URL + schoolId.toString(), { headers: reqHeader });
  // }
  /** GET Teachers from the server */
  getTeachersNo404(schoolId: number): Observable<TeacherData[]> {
    // Add safe, URL encoded search parameter if there is a search term
    const options = schoolId ?
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'AuthToken': '16021987',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }),
        params: new HttpParams().set('schoolId', schoolId.toString())
      } : {};
    return this.http.get<TeacherData[]>(Constants.ROOT_URL + Constants.TEACHER_LIST_URL, options)
      .pipe(
        catchError(this.handleError('getTeachers', []))
      );
  }

  getTeachers<Data>(schoolId: number): Observable<TeacherData[]> {
    const url = `${Constants.ROOT_URL + Constants.TEACHER_LIST_URL}?schoolId=${schoolId}`;
    return this.http.get<TeacherData[]>(url, httpOptions).pipe(
      tap(_ => this.logger.log(this.className, `fetched teachers schoolId=${schoolId}`)),
      catchError(this.handleError<TeacherData[]>(`getTeachers schoolId=${schoolId}`))
    );
  }


  getUserInfo(emailId: string, schoolId: number): Observable<any> {
    const options = emailId ?
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'AuthToken': '16021987',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        }),
        params: new HttpParams().set('emailId', emailId).set('schoolId', schoolId.toString())
      } : {};
    return this.http.get<any[]>(Constants.ROOT_URL + Constants.GET_USER_INFO_URL, options)
      .pipe(
        catchError(this.handleError('getTeachers', []))
      );
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
