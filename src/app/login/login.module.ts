import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login.routing';

import { ModalModule } from 'ngx-bootstrap/modal';

import{AuthenticationService} from '../_services/_authentication.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
           ModalModule.forRoot(),
    ],
    declarations: [
        LoginComponent,
    ],
      providers: [     
        AuthenticationService,
      ]
})
export class LoginModule {
}
