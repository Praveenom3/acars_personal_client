import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from '../../_services/_authentication.service';
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-activate-user',
    templateUrl: './activate-user.component.html'
})
export class ActivateUserComponent implements OnInit {

    private isValidToken: boolean = false;
    private token: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.token = params['token'];
            });
        this.validateTokenAndActivateUser();
    }
    /**
     * Validating token and activating user
     */
    private validateTokenAndActivateUser() {
        this.authenticationService.validateTokenAndActivateUser(this.token).subscribe(
            result => {
                this.toastrService.success('User is activated, Please login with credentials!');
                this.router.navigate(['/login']);
            },
            error => {
                this.toastrService.error('Token is  invalid');
                this.router.navigate(['/login']);
            });
    }
}