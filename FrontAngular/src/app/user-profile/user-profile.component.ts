import { Component, OnInit } from "@angular/core";
import { UserService } from '../core/user/user.service';
import { UserModel } from '../core/user/user.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

    public userProfileDetails: UserModel
    
    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        this.userService.getUserProfile()
            .subscribe((res: any) => {
                this.userProfileDetails = res['user']
            })
    }

    public logout() {
        this.userService.logout()
        this.router.navigate(['login'])
    }
}