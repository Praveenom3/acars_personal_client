import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule }   from 'ng2-file-upload/file-upload/file-upload.module';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { PartialViews } from "app/_partial-views/partial-views.module";


@NgModule({
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
     FileUploadModule,
     PartialViews
  ],
  declarations: [EnrollmentsComponent]
})
export class EnrollmentsModule { }
