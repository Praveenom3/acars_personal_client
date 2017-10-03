import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll/payroll.component';
import { FileUploadModule }   from 'ng2-file-upload/file-upload/file-upload.module';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { UploadDocumentsComponent } from 'app/client/employer-info/payroll/upload-documents/upload-documents.component';

@NgModule({
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FileUploadModule,
    PartialViews
  ],
  declarations: [PayrollComponent, UploadDocumentsComponent]
})
export class PayrollModule { }
