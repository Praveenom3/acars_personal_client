import { Component } from '@angular/core';

@Component({
    templateUrl: 'products-not-exists.component.html'
})
export class ProductsNotExists {
    public userType: string;
    constructor() {
        this.userType = localStorage.getItem('usertype');
    }
}
