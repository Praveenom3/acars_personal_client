import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from "app/client/client-layout/client-layout.component";
import { LoginLayoutComponent } from './login/login-layout.component';
import { SetPasswordComponent } from './login/set-password.component';
import { ActivateUserComponent } from "app/admin/activate-user/activate-user.component";

import { AppComponent } from './app.component';
import { P404Component } from './pages/404.component';
import { LoginModule } from './login/login.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Model & Services
import { GlobalService } from './_services/_global.service';
import { AuthGuard } from './_services/_auth.guard';
import { AccessGuard } from './_services/_access.guard';

import { ValidationService } from "app/_services/_validation.service";

import { ToastrModule } from 'ngx-toastr';
import { PartialViews } from "app/_partial-views/partial-views.module";

import { CookieModule } from 'ngx-cookie';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { IdleTimeoutService } from "app/_services/_idle-timeout.service";

import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { CompanyUserService } from "app/_services/_company-user.service";
import { ProductsNotExists } from './pages/products-not-exists.component';
import { TokenValidationResolver } from "app/_services/token-validation-resolver";
import { HttpService } from "app/interceptors/http.service"
import { LoaderService } from "app/interceptors/loader.service";

@NgModule({
  declarations: [
    AppComponent,
    P404Component,
    ProductsNotExists,
    LoginLayoutComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    SetPasswordComponent,
    ActivateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    LoginModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 2000 }),
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    PartialViews,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    HttpService,
    IdleTimeoutService,
    AuthGuard,
    LoaderService,
    AccessGuard,
    GlobalService, ClientDashBoardService, CompanyUserService,
    ValidationService, TokenValidationResolver],

  bootstrap: [AppComponent]
})
export class AppModule {


}
