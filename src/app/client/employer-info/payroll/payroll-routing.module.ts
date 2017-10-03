import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from "app/client/employer-info/payroll/payroll/payroll.component";
import { UploadDocumentsComponent } from 'app/client/employer-info/payroll/upload-documents/upload-documents.component';
import { DocumentsHistoryComponent } from 'app/client/employer-info/payroll/documents-history/documents-history.component';
import { DocumentHistoryDetailsComponent } from 'app/client/employer-info/payroll/documents-history-details/document-history-details.component';

const routes: Routes = [
    {
        path: '',
        component: PayrollComponent
    },
    {
        path: 'upload-documents',
        component: UploadDocumentsComponent
    },
    {
        path: 'documents-history',
        component: DocumentsHistoryComponent
    },
    {
        path: 'document-history-details',
        component: DocumentHistoryDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PayrollRoutingModule { }
