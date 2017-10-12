import { Component } from '@angular/core';
import { AuthenticationService } from "app/_services/_authentication.service";

@Component({
    templateUrl: 'products-not-exists.component.html'
})
export class ProductsNotExists {
    public userType: string;
    constructor(private authenticationService: AuthenticationService) {
        this.userType = localStorage.getItem('usertype');
    }
}
