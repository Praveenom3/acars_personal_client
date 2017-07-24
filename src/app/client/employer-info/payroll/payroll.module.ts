import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll/payroll.component';
import { FileUploadModule }   from 'ng2-file-upload/file-upload/file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FileUploadModule
  ],
  declarations: [PayrollComponent]
})
export class PayrollModule { }
