import { Injectable } from '@angular/core';
import { UserModel } from '../user/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class UserService {

    private noAuthenticationHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })}

    constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) {}

    public postUser(user: UserModel) {
        return this.http.post<UserModel>(`${environment.apiBaseUrl}/register`, user, this.noAuthenticationHeader) 
    }

    public login(user) {
        return this.authService.authenticate(user)
    }

    public logout() {
        this.tokenService.removeToken()
    }

    public isLogged() {
        let userPayload = this.getUserPayload()
        if(userPayload) return userPayload.exp > Date.now() / 1000
        else return false 
    }

    public getUserProfile() {
        return this.http.get(`${environment.apiBaseUrl}/user-profile`)
    }

    private getUserPayload() {
        if(this.tokenService.hasToken()) 
            return JSON.parse(atob(this.tokenService.getToken().split('.')[1]))
        else return null
    }

}