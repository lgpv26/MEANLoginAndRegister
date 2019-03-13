import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../core/token/token.service';
import { Router } from '@angular/router';
import { UserService } from '../core/user/user.service';
import { AlertService } from '../shared/components/alert/alert.service';

@Component({
    templateUrl: './login.component.html',
    providers: [AlertService]
})
export class LoginComponent implements OnInit{

    public loginForm: FormGroup

    @ViewChild('emailInput') public emailInput: ElementRef<HTMLInputElement>

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private tokenService: TokenService,
        private router: Router,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6)
            ]]
        })

        this.emailInput.nativeElement.focus()
    }

    public submitLogin(form: FormGroup) {
        this.userService.login(form.value)
            .subscribe(
                (res) => {
                    this.tokenService.setToken(res['token'])
                    this.router.navigate(['/user'])
                },
                (err) => {
                    this.alertService.danger(err.error.message)
                    console.log(err)
                })
    }
}