import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerInfoRoutingModule } from './employer-info-routing.module';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";

@NgModule({
  imports: [
    CommonModule,
    EmployerInfoRoutingModule
  ],
  declarations: []
})
export class EmployerInfoModule {
  constructor(private _clientDashService: ClientDashBoardService) {
    _clientDashService.setBrandData();
    _clientDashService.setActiveProduct();
  }

}
