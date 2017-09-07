import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GlobalService } from "app/_services/_global.service";
import { GeneralPlanInfoService } from "app/_services/_general-plan-info.service";
import { MecCoverageService } from "app/_services/_mec-coverage.service";
import { PlanClassesService } from "app/_services/_plan-classes.service";

@Injectable()
export class PlanClassDataDataResolver implements Resolve<any> {
    planClass_id: any;
    company_id: any;
    product_id: any;

    constructor(
        private globalService: GlobalService,
        private planClassesService: PlanClassesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.product_id = this.globalService.decode(route.params['product']);
        this.company_id = this.globalService.decode(route.params['company']);
        if (route.params['encodedId']) {
            this.planClass_id = this.globalService.decode(route.params['encodedId']);
            if (state.url.indexOf('/coverage-offered') !== -1) {
                return this.planClassesService.getCoverageOffered(this.planClass_id);
            } else if (state.url.indexOf('/employee-contributions') !== -1) {
                return this.planClassesService.getEmployeeContribution(this.planClass_id);
            }
            else if (state.url.indexOf('/plan-classes/plan-class') !== -1) {
                return this.planClassesService.getPlanClass(this.planClass_id);
            }
        }
    }

}