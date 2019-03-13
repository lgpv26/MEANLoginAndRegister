import { Component, OnInit } from "@angular/core";
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert.model';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent {

    public alerts: Alert[] = []

    constructor(private alertService: AlertService) {
        this.alertService.getAlert()
        .subscribe((alert) => {
            if(!alert) {
                this.alerts = []
                return
            }

            if(this.alerts.length >= 3) this.alerts.shift()
            else this.alerts.push(alert)

            setTimeout(() => this.removeAlert(alert), 12000)
        })
    }

    public removeAlert(alertToRemove: Alert) {
        this.alerts = this.alerts.filter((alert) => alert != alertToRemove)
    }

    public getClassAlert(alert: Alert) {
        if(!alert) return ''
        
        switch(alert.alertType) {
            case AlertType.SUCCESS:
                return 'alert-success'
            case AlertType.DANGER: 
                return 'alert-danger'
            case AlertType.WARNING:
                return 'alert-warning'
            case AlertType.INFO: 
                return 'alert-info'
        }
    }
}