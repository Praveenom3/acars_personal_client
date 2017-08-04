import { Injectable } from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "app/_services/_authentication.service";
import { CookieService } from "ngx-cookie";
import { Router } from "@angular/router";

@Injectable()
export class IdleTimeoutService{

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

   constructor(
       private router: Router,
        private toastrService: ToastrService,
        private authenticationService: AuthenticationService,
        private _cookieService:CookieService,
        private idle: Idle,
        private keepalive: Keepalive) {
    }

    init(){

            // sets an idle timeout of 0.5 hour.
    this.idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {this.idleState = 'No longer idle.';});
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      if(!this._cookieService.get('rememberMe')){
            this.authenticationService.logout();
            this.router.navigate(['/']);
        }
    });
    this.idle.onIdleStart.subscribe(() => {this.idleState = 'You\'ve gone idle!';});
    this.idle.onTimeoutWarning.subscribe((countdown) => {this.idleState = 'You will time out in ' + countdown + ' seconds!';
  
  });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
    }

    
    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

}