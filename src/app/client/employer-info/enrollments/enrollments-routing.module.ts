import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollmentsComponent } from "app/client/employer-info/enrollments/enrollments/enrollments.component";

const routes: Routes = [
    {
        path: '',
        component: EnrollmentsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EnrollmentsRoutingModule { }
