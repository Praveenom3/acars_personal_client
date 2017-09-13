import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Injector, ComponentRef } from '@angular/core';
import { Overlay } from 'ngx-toastr/overlay/overlay';
import { ToastrConfig } from 'ngx-toastr';

@Injectable()
export class CustomToastrService extends ToastrService {
    constructor(toastrConfig: ToastrConfig, overlay: Overlay, _injector: Injector) {
        super(toastrConfig, overlay, _injector);
        //toastrConfig.timeOut = 2000;
    }
}