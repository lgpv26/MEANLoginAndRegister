import { Injectable } from "@angular/core";

Injectable({providedIn: 'root'})
export class TokenService {

    public hasToken() {
        return !!this.getToken()
    }

    public getToken() {
        return localStorage.getItem('token')
    }

    public setToken(token: string) {
        localStorage.setItem('token', token)
    }

    public removeToken() {
        localStorage.removeItem('token')
    }

}