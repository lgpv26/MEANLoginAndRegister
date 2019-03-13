import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private noAuthenticationHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })}

    constructor(private http: HttpClient) {}

    public authenticate(credentials) {
        return this.http
            .post(`${environment.apiBaseUrl}/authenticate`, credentials, this.noAuthenticationHeader)
    }
}