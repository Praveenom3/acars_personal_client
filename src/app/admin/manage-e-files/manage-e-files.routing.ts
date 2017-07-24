import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { ManageEFilesComponent } from './manage-e-files.component';

const routes: Routes = [
  {
    path: '',
    component: ManageEFilesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEFilesRoutingModule {}
