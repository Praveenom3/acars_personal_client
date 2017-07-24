import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEFilesRoutingModule } from "./manage-e-files.routing";
import { ManageEFilesComponent } from "app/admin/manage-e-files/manage-e-files.component";

@NgModule({
  imports: [
    CommonModule,
    ManageEFilesRoutingModule
  ],
  declarations: [ ManageEFilesComponent ]
})
export class ManageEFilesModule { }
