import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login.component';
import { AlertModule } from '../shared/components/alert/alert.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, AlertModule, RouterModule, ReactiveFormsModule]
})
export class LoginModule {}