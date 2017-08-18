export interface Purchases{
     purchase_user_id:number;
     purchase_id:number;
     product_id: number;
     client_id:number;
     user_id:number;
     total_no_eins: number;
     total_no_forms: number;
     purchaser_first_name:any;
     purchaser_last_name:any;
     purchaser_email:any;
     purchaser_mobile:number;
     purchase_status : boolean;
     purchase_date : any;
     amount : number;
     account_manager : number;
     is_invoice :boolean;
     invoice_no: any;
     invoice_created_at: any;
     is_invoice_paid: boolean;
     is_primary_contact:number;
     is_billing_contact :number;
     is_agreement_signed :number;
     created_at:any;
     created_by:number;
     updated_at:any;
     updated_by:number;                  
}
