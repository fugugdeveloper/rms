import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "./user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private userAuthService: UserAuthService,
        private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.userAuthService.getToken();
        const refreshToken = this.userAuthService.getRefreshToken();
        // if (!(req.headers.get('No-Auth')) || ((req.headers.get('No-Auth') === 'True') && (req.headers.get('refresh_token') === 'False'))) {
        //     console.log("I'm here in No-Auth , bro")

        //     return next.handle(req.clone());

        // }
        // console.log("I'm here above AddToken, bro")
        //        const request = this.addToken(req, token)
        //     //    req.clone({
        //     //         headers: req.headers
        //     //             .set('Authorization', `Bearer ${token}`)
        //     //     });

        //         return next.handle(request).pipe(
        //             catchError(
        //                 (err: HttpErrorResponse) => {
        //                     console.log(err.status);
        //                     if (err.status === 401) {
        //                         this.router.navigate(['/login']);
        //                     } else if (err.status === 403) {
        //                         this.userAuthService.clear();
        //                         console.log("I'm here in 403 error, bro")
        //                         this.router.navigate(['/login']);
        //                     } else if (err.status === 500) {
        //                         console.log("Internal Error: ", err.message)
        //                     }
        //                     console.log("Error: ", err.message);
        //                     console.log("Status", err.status);
        //                     console.log("statusText: ", err.statusText);
        //                     return throwError("Some thing is wrong");
        //                 }
        //             )
        //         );


        if (token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                    Authorization: `Bearer ${refreshToken}`
                }
            });
        }

        return next.handle(req).pipe(
            catchError(
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    } else if (err.status === 403) {
                        console.log("I'm here in 403 error, bro")
                        req.clone({
                            headers: req.headers
                                .set('Authorization', `Bearer ${refreshToken}`)
                        });
                        this.router.navigate(['home']);
                    } else if (err.status === 500) {
                        console.log("Internal Error: ", err.message)
                    }

                    console.log("Error: ", err.message);
                    console.log("Status", err.status);
                    console.log("statusText: ", err.statusText);
                    this.router.navigate(['home']);
                    return throwError("Some thing is wrong");
                }
            )

        );
    }



    private addToken(request: HttpRequest<any>, token: string) {

        return request.clone(
            {
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}
