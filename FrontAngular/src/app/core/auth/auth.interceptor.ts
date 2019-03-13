import { Injectable } from "@angular/core";
import { HttpInterceptor } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router) {}

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        if(req.headers.get('noauth')) return next.handle(req.clone())
        else {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
            })
            return next.handle(clonedReq)
                .pipe(tap(
                    (event) => {},
                    (err) => {
                        if(err.error.auth === false) this.router.navigate(['login'])
                    }
                ))
        }
    }

}