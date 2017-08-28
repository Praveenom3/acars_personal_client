export interface Company {
    company_id: number;
    company_name: string;
    company_ein: string;
    client_id: number;
    purchase_id: number;
    is_invoice_paid: boolean;
    purchase_status: boolean;
    company_client_number: any;
    client_agreement: any;
    discovery_session: any;
    basic_plan_information: any;
    benefitPlan_planClasses: any;
    payroll_data: any;
    medical_plan_data: any;
}
