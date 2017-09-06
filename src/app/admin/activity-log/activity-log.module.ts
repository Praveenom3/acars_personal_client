import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ActivityRoutingModule} from './activity.routing';
import {ActivityLogComponent} from './activity-log.component';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  declarations: [ActivityLogComponent]
})
export class ActivityLogModule { }
