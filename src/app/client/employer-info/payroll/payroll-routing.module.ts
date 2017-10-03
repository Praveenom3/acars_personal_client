import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from "app/client/employer-info/payroll/payroll/payroll.component";
import { UploadDocumentsComponent } from 'app/client/employer-info/payroll/upload-documents/upload-documents.component';

const routes: Routes = [
    {
        path: '',
        component: PayrollComponent
    },
    {
        path: 'upload-documents',
        component: UploadDocumentsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PayrollRoutingModule { }
