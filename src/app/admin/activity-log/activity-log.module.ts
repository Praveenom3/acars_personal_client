import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ActivityLogRoutingModule} from './activity-log.routing';
//import {ActivityLogComponent} from './activity-log.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityLogRoutingModule
  ],
 // declarations: [ActivityLogComponent]
})
export class ActivityLogModule { }
