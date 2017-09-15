export interface Company {

    company_id: number;
    company_name: string;
    company_ein: string;
    client_id: number;
    purchase_id: number;
    purchase_status: boolean;
    company_client_number: any;

    is_invoice_paid: any;
    client_agreement: any;
    discovery_session: any;

    basicReporting: any;
    benefitPlan: any;
    planClasses:any
    payroll_data: any;
    medical_plan_data: any;

    primary_data: boolean;
    onBoarding_data: boolean;
    company_data: boolean;
    employee_data: boolean;
    companyUsers: any;
}
