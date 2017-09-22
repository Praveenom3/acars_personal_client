import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ElementMasterService } from "app/_services/_element-master.service";
import { GlobalService } from "app/_services/_global.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class ElementMasterResolver implements Resolve<any> {
    isCompletedData: any;
    company_id: any;
    product_id: any;

    constructor(private aroute: ActivatedRoute, private elementMasterService: ElementMasterService,
        private globalService: GlobalService,
        private toasterService: ToastrService,
        private router: Router,
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.product_id = this.globalService.decode(route.params['product']);
        this.company_id = this.globalService.decode(route.params['company']);
        let sectionId;
        let urlString;
        this.validateSessionDataAndUrl();

        if (state.url.indexOf('/emp-status-tracking') !== -1) {
            sectionId = 2;
            urlString = "basic-reporting-info";
        } else if (state.url.indexOf('/plan-offering-criteria') !== -1) {
            sectionId = 3;
            urlString = "basic-reporting-info";
        } else if (state.url.indexOf('/designated-govt-entity') !== -1) {
            sectionId = 4;
            urlString = "basic-reporting-info";
        } else if (state.url.indexOf('/aggregated-group') !== -1) {
            sectionId = 5;
            urlString = "basic-reporting-info";
        } else if (state.url.indexOf('/anything-else') !== -1) {
            sectionId = 6;
            urlString = "basic-reporting-info";
        } else if (state.url.indexOf('/basic-reporting-info') !== -1) {
            // this.validateStepLevelData('basic-reporting-info');
            urlString = "basic-reporting-info";
            sectionId = 1;
        } else if (state.url.indexOf('/mec-coverage') !== -1) {
            urlString = "benefit-plan-info";
            sectionId = 8;
        } else if (state.url.indexOf('/benefit-plan-info') !== -1) {
            //  this.validateStepLevelData('benefit-plan-info');
            urlString = "benefit-plan-info";
            sectionId = 7;
        }
        else if (state.url.indexOf('/coverage-offered') !== -1) {
            urlString = "plan-class";
            sectionId = 10;
        }
        else if (state.url.indexOf('/employee-contributions') !== -1) {
            urlString = "plan-class";
            sectionId = 11;
        }
        else if (state.url.indexOf('/plan-classes/plan-class') !== -1) {
            urlString = "plan-class";
            sectionId = 9;
        }
        else if (state.url.indexOf('/plan-classes') !== -1) {
            urlString = "plan-class";
            sectionId = 9;
        }
      
        // console.log(state.url);
        this.checkIsCompleted(urlString, this.elementMasterService.getLabels(sectionId, this.product_id, this.company_id), state.url);

        return this.elementMasterService.getLabels(sectionId, this.product_id, this.company_id);
    }

    public checkIsCompleted(section, data, stateUrl) {
        let sessionCompanyData = JSON.parse(this.globalService.getCompany());
        let sessionClientId = this.globalService.decode(sessionCompanyData.client_id);
        let sessionCompanyId = this.globalService.decode(sessionCompanyData.company_id);
        let sessionProductId = this.globalService.decode(sessionCompanyData.product_id);
        data.subscribe(result => {
            this.isCompletedData = result.company;
            if (section == "basic-reporting-info") {
                if (!sessionCompanyData.company_ein) {
                    this.toasterService.error("Company EIN is required to fill Basic Plan information.");
                    this.redirectToDashboard(sessionProductId, sessionClientId);
                }
            }
            else if (section == "benefit-plan-info") {
                if (!this.isCompletedData.basicReporting) {
                    this.toasterService.error("Basic Reporting information is required to fill.");
                    this.router.navigate(['client/' + this.globalService.encode(this.product_id) + '/' + this.globalService.encode(this.company_id) + '/employer-info/basic-reporting-info']);
                }
            } else if (section == "plan-class") {
                if (!this.isCompletedData.benefitPlan) {
                    this.toasterService.error("Benefit Plan information is required to fill.");
                    this.router.navigate(['client/' + this.globalService.encode(this.product_id) + '/' + this.globalService.encode(this.company_id) + '/employer-info/benefit-plan-info']);
                }
            }
            /* if (this.product_id != sessionProductId || this.company_id != sessionCompanyId) {
                 this.toasterService.error("Un Authorised company user");
                 this.redirectToDashboard(sessionProductId, sessionClientId);
             }*/
        });

        return true;
    }

    /**
     * Validaitng session stored data and data through the url access
     */
    private validateSessionDataAndUrl() {
        let sessionCompanyData = JSON.parse(this.globalService.getCompany());
        let sessionCompanyId = this.globalService.decode(sessionCompanyData.company_id);
        let sessionProductId = this.globalService.decode(sessionCompanyData.product_id);
        let sessionClientId = this.globalService.decode(sessionCompanyData.client_id);
        if (!sessionCompanyData.primary_data) {
            this.toasterService.error("Please fill primary data");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        if (!sessionCompanyData.onBoarding_data) {
            this.toasterService.error("Please complete on boarding step");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        if (this.product_id != sessionProductId && this.company_id != sessionCompanyId) {
            this.toasterService.error("Un Authorised company user");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        return true;
    }
    /**
     * 
     * @param productId 
     * @param clientId 
     */
    private redirectToDashboard(productId, clientId) {
        this.router.navigate(['client/' + this.globalService.encode(productId) + '/' + this.globalService.encode(clientId) + '/dashboard']);
    }
    /**
     * Validates individual steps whether previous steps were completed.
     * @param step 
     */
    private validateStepLevelData(step: string) {
        let sessionCompanyData = JSON.parse(this.globalService.getCompany());
        let sessionCompanyId = this.globalService.decode(sessionCompanyData.company_id);
        let sessionProductId = this.globalService.decode(sessionCompanyData.product_id);
        let sessionClientId = this.globalService.decode(sessionCompanyData.client_id);

        switch (step) {
            case 'basic-reporting-info':
                if (!sessionCompanyData.company_ein) {
                    this.toasterService.error("Company EIN is required to fill Basic Plan information");
                    this.redirectToDashboard(sessionProductId, sessionClientId);
                }
                break;
            case 'benefit-plan-info':
                if (!sessionCompanyData.company_ein || !sessionCompanyData.basicReporting) {
                    this.toasterService.error("Basic Plan information is required to fill Benefit Plan information");
                    this.redirectToDashboard(sessionProductId, sessionClientId);
                }
                break;
        }
        return true;
    }
}
