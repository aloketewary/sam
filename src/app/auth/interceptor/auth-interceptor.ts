import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../common/class/constants';
import { CookiesStorageService } from 'ngx-store';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private cookiesStorageService: CookiesStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (this.cookiesStorageService.get(Constants.LOGIN_PERSISTENCE_NAME) != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('AuthToken', '16021987')
            });
            return next.handle(clonedreq)
                .do(
                    succ => { },
                    err => {
                        if (err.status === 401) {
                            this.router.navigateByUrl('/login');
                        }
                    }
                );
        } else {
            this.router.navigateByUrl('/login');
        }
    }
}
