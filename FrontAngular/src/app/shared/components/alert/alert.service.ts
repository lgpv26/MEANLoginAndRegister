import { Injectable } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert.model';

@Injectable({providedIn: 'root'})
export class AlertService {

    private alertSubject: Subject<Alert> = new Subject<Alert>()
    private keepAfterRouteChange: boolean = false

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) this.keepAfterRouteChange = false
                else this.clear()
            }
        })
    }

    public getAlert() {
        return this.alertSubject.asObservable()
    }

    public success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange)
    }

    public danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange)
    } 

    public warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange)
    }

    public info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange)
    }
    
    public clear() {
        this.alertSubject.next(null)
    }
    
    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange
        this.alertSubject.next(new Alert(alertType, message))
    }
}