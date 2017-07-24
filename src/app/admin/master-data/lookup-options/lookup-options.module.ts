import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupOptionsRoutingModule } from './lookup-options-routing.module';

import { LookupOptionsComponent } from './lookup-options.component';

@NgModule({
  imports: [
    CommonModule,
    LookupOptionsRoutingModule
  ],
  declarations: [LookupOptionsComponent]
})
export class LookupOptionsModule { }
