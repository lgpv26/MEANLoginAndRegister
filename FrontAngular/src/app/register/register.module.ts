import { NgModule } from "@angular/core";
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../shared/components/alert/alert.module';

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, AlertModule, RouterModule, ReactiveFormsModule]
})
export class RegisterModule {}