import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './pages/404.component';

import { LoginComponent } from './login/login.component'
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './login/login-layout.component';
import { ClientLayoutComponent } from "app/client/client-layout/client-layout.component";
import { SetPasswordComponent } from './login/set-password.component';
import { ActivateUserComponent } from './admin/activate-user/activate-user.component';
import { ProductsNotExists } from './pages/products-not-exists.component';

import { AuthGuard } from './_services/_auth.guard';
import { TokenValidationResolver } from "app/_services/token-validation-resolver";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: 'app/login/login.module#LoginModule'
            }
        ],
    },
    {
        path: 'products-not-exists',
        component: ProductsNotExists,
    },
    {
        path: 'set-password',
        component: SetPasswordComponent,
        resolve: {
            token_validation_data: TokenValidationResolver
        }
    },
    {
        path: 'activate-user',
        component: ActivateUserComponent,
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin',
                loadChildren: 'app/admin/admin.module#AdminModule'
            }
        ],
    },
    {
        path: '',
        component: ClientLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'client',
                loadChildren: 'app/client/client.module#ClientModule'
            }
        ],
    },

    // otherwise redirect to home
    { path: '**', component: P404Component }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
