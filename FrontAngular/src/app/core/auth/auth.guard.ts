import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.userService.isLogged()) {
            this.router.navigate(['login'])
            this.tokenService.removeToken()
            return false
        }
        return true
         
    }
}