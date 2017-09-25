import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { LoaderService, LoaderState } from "app/interceptors/loader.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'app';

    show = false;

    private subscription: Subscription;

    constructor(private router: Router, private loaderService: LoaderService) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
