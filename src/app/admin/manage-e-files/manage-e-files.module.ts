import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEFilesRoutingModule } from "./manage-e-files.routing";
import { ManageEFilesComponent } from "app/admin/manage-e-files/manage-e-files.component";
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    ManageEFilesRoutingModule,
    PartialViews
  ],
  declarations: [ ManageEFilesComponent ]
})
export class ManageEFilesModule { }
