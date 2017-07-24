import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basic-reporting-info',
        pathMatch: 'full',
    },
    {
        path: '',        
        children: [
            {
                path: 'basic-reporting-info',
                loadChildren: 'app/client/employer-info/basic-reporting-info/basic-reporting-info.module#BasicReportingInfoModule'
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'benefit-plan-info',
                loadChildren: 'app/client/employer-info/benefit-plan-info/benefit-plan-info.module#BenefitPlanInfoModule'
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'plan-classes',
                loadChildren: 'app/client/employer-info/plan-classes/plan-classes.module#PlanClassesModule'
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'payroll',
                loadChildren: 'app/client/employer-info/payroll/payroll.module#PayrollModule'
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'enrollments',
                loadChildren: 'app/client/employer-info/enrollments/enrollments.module#EnrollmentsModule'
            }
        ],
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EmployerInfoRoutingModule { }
